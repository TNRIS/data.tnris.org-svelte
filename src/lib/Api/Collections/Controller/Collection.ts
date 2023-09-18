import bbox from "@turf/bbox";
import { get, writable, type Writable } from "svelte/store";
import mapStore from "../../../Components/Map/mapStore";
import { getMapAreasByCollectionId } from "./getAreas";
import { getCollectionById } from "./getCollections";

export class Collection {
  constructor(collection_id: string) {
    this.collection_id = collection_id;
    this.currentTab = this.currentTab;
    this.hoveredAreaId = this.hoveredAreaId;
    this.selectedAreas = writable([])
    this.selectedAreaType = this.selectedAreaType;
    this.areaSearch = this.areaSearch;
    this.details = this.getCollectionDetails();
    this.areas = this.getResourceAreas();
    this.mapReady = this.mapReady;
  }

  collection_id: string;
  currentTab: Writable<"Metadata" | "Downloads" | "Custom Order" | "Contact"> =
    writable("Metadata");
  details;
  areas;
  areaSearch = writable("");
  hoveredAreaId: Writable<null | string> = writable(null);
  selectedAreas = writable([]);
  selectedAreaType = writable(null);
  mapReady = writable(false);
  sigCtrl = new AbortController();
  sig = this.sigCtrl.signal;

  ///////////////////////////////////
  // API.tnris.org data endpoints methods
  ///////////////////////////////////
  getCollectionDetails = async () =>
    await getCollectionById(this.collection_id, this.sig);

  ///////////////////////////////////
  // MapServer.tnris.org data endpoints methods
  ///////////////////////////////////
  getResourceAreas = async () =>
    await getMapAreasByCollectionId(this.collection_id, this.sig);

  ///////////////////////////////////
  // Collection Extent from Catalog
  ///////////////////////////////////
  getCollectionExtent = async (collection_id) => {
    const resp = await fetch(
      `https://api.tnris.org/api/v1/collections_catalog/${collection_id}`
    );
    const json = await resp.json();

    return json.the_geom;
  };

  //////////////////////////////////
  // Mapbox/Maplibre event methods
  //////////////////////////////////
  public onMapLoaded = () => {
    const map = get(mapStore);

    const waiting = () => {
      if (!map.isStyleLoaded()) {
        //console.log("loading map style...");
        setTimeout(waiting, 200);
      } else {
        //console.log("map style loaded...");
        this.mapReady.update((v) => true);
      }
    };
    waiting();
  };

  onMapAreaClick = (e) => {
    const map = get(mapStore);

    if (e.features[0]) {
      let newArea = {
        label: e.features[0].properties.area_type_name,
        value: e.features[0].properties.area_type_id,
      };
      //console.log(newArea);
      this.toggleAreaSelection(map, newArea);
    }
  };
  onMapAreaMove = (e) => {
    const map = get(mapStore);
    map.getCanvas().style.cursor = "pointer";
    if (e?.features?.length > 0) {
      if (e.features[0].area_type_id != this.hoveredAreaId) {
        const prevHoverArea = get(this.hoveredAreaId);
        const curHoverArea = e.features[0]?.id;

        if (curHoverArea !== prevHoverArea) {
          this.hoveredAreaId.update((v) => curHoverArea);

          if (map) {
            map.setFeatureState(
              {
                source: "tnris-collection-areas",
                id: prevHoverArea,
              },
              {
                hover: false,
              }
            );
            map.setFeatureState(
              {
                source: "tnris-collection-areas",
                id: curHoverArea,
              },
              {
                hover: true,
              }
            );
          }
        }
        /*  if (map && resourceAreaId) {
          map.setFeatureState(
            {
              source: "tnris-collection-areas",
              id: resourceAreaId,
            },
            {
              hover: true,
            }
          );
        } */
      }
    }
  };
  onMapAreaLeave = (e) => {
    const map = get(mapStore);
    map.getCanvas().style.cursor = "";
    map.setFeatureState(
      {
        source: "tnris-collection-areas",
        id: get(this.hoveredAreaId),
      },
      {
        hover: false,
      }
    );
    this.hoveredAreaId.update((v) => null);
    //console.log("mouseexit", e, get(this.hoveredAreaId));
  };
  removeCollectionAreasFromMap = () => {
    const map = get(mapStore);
    if (
      map &&
      map.loaded() &&
      map.getLayer("tnris-collection-areas") != undefined
    ) {
      map.removeLayer(`tnris-collection-areas`);
      map.removeSource(`tnris-collection-areas`);
      map.off("click", "tnris-collection-areas", this.onMapAreaClick);
      map.off("mousemove", "tnris-collection-areas", this.onMapAreaMove);
      map.off("mouseleave", "tnris-collection-areas", this.onMapAreaLeave);
    }
  };

  public addCollectionAreasToMap = (areas) => {
    const map = get(mapStore);
    if (map && map.loaded()) {
      if (map.getLayer("tnris-collection-areas") !== undefined) {
        this.removeCollectionAreasFromMap();
      }
      try {
        map.addSource(`tnris-collection-areas`, {
          type: "geojson",
          data: areas,
          promoteId: "area_type_id",
        });
      } catch (e) {
        console.log(e);
      }
      try {
        map.addLayer({
          id: `tnris-collection-areas`,
          source: `tnris-collection-areas`,
          type: "fill",
          paint: {
            //selected feature style filter
            "fill-color": [
              "case",
              ["boolean", ["feature-state", "selected"], false],
              "#888",
              "#fff",
            ],
            //hovered feature style filter
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              0.8,
              0.4,
            ],
            //selected feature style filter
            "fill-outline-color": [
              "case",
              ["boolean", ["feature-state", "selected"], false],
              "#fof",
              "#444",
            ],
          },
        });
      } catch (e) {
        console.log(e);
      }

      let bb = bbox(areas);
      try {
        map.fitBounds([bb[0], bb[1], bb[2], bb[3]], {
          padding: 16,
        });
      } catch (e) {
        console.log(e);
      }

      map.on("click", "tnris-collection-areas", this.onMapAreaClick);
      map.on("mousemove", "tnris-collection-areas", this.onMapAreaMove);
      map.on("mouseleave", "tnris-collection-areas", this.onMapAreaLeave);
    }

    return this;
  };

  // add collection extent to map
  public addCollectionExtentToMap = async () => {
    const map = get(mapStore);
    const extent = await this.getCollectionExtent(this.collection_id);

    //console.log(extent, this.collection_id, map, map.loaded);
    //console.log("adding extent");
    if (map.getLayer("tnris-collection-extent") !== undefined) {
      map.removeLayer("tnris-collection-extent");
      map.removeSource("tnris-collection-extent");
    }
    try {
      //console.log("adding extent src", extent);
      map.addSource(`tnris-collection-extent`, {
        type: "geojson",
        data: extent,
      });
    } catch (e) {
      console.log(e);
    }
    try {
      //console.log("adding extent layer", extent);
      map.addLayer({
        id: `tnris-collection-extent`,
        source: `tnris-collection-extent`,
        type: "line",
        paint: {
          //selected feature style filter
          "line-color": "#ff00ff",
          "line-width": 3,
        },
      });

      return map;
    } catch (e) {
      console.log(e);
    }

    return this;
  };

  public removeAreaSelection = (map, opt) => {
    this.selectedAreas.update((s) => s.filter((v) => v.value != opt.value));
    
    //remove states
    map.setFeatureState(
      {
        id: opt.value,
        source: "tnris-collection-areas",
      },
      {
        hover: false,
      }
    );
    map.setFeatureState(
      {
        id: opt.value,
        source: "tnris-collection-areas",
      },
      {
        selected: false,
      }
    );
  };

  public addAreaSelection = (map, opt) => {
    //console.log(opt)
    map.setFeatureState(
      {
        id: opt.value,
        source: "tnris-collection-areas",
      },
      {
        selected: true,
      }
    );
    this.selectedAreas.update((s) => [...s, opt]);
  };

  public toggleAreaSelection = (map, opt) => {
    if (get(this.currentTab) != "Downloads") {
      this.currentTab.update((v) => "Downloads");
      //console.log(get(this.currentTab));
    }
    if (get(this.selectedAreas).some((cur) => cur.value == opt.value)) {
      this.removeAreaSelection(map, opt);
    } else {
      this.addAreaSelection(map, opt);
    }
  };

  public clearAreaSelection = () => {
    const map = get(mapStore);
    const s = get(this.selectedAreas);
    s.map((v) => this.removeAreaSelection(map, v));
  };

  public destroy = () => {
    this.removeCollectionAreasFromMap();
  };
}
