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
    this.selectedAreas = this.selectedAreas;
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

  //////////////////////////////////
  // Mapbox/Maplibre event methods
  //////////////////////////////////
  public onMapLoaded = () => {
    const map = get(mapStore);

    const waiting = () => {
      if (!map.isStyleLoaded()) {
        console.log("loading map style...");
        setTimeout(waiting, 200);
      } else {
        console.log("map style loaded...");
        this.mapReady.update((v) => true);
      }
    };
    waiting();
  };

  onMapAreaClick = (e) => {
    const map = get(mapStore);
    const selectedAreas = this.selectedAreas;

    if (e.features[0]) {
      let newArea = {
        label: e.features[0].properties.area_type_name,
        value: e.features[0].properties.area_type_id,
      };
      console.log(newArea);
      this.toggleAreaSelection(map, newArea);
    }
  };
  onMapAreaMove = (e) => {
    const map = get(mapStore);
    map.getCanvas().style.cursor = "pointer";
    if (e?.features?.length > 0) {
      if (e.features[0].area_type_id != this.hoveredAreaId) {
        this.hoveredAreaId.update((v) => e.features[0].id);
      }
    }
  };
  onMapAreaLeave = (e) => {
    const map = get(mapStore);
    map.getCanvas().style.cursor = "";
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
      map.addSource(`tnris-collection-areas`, {
        type: "geojson",
        data: areas,
        promoteId: "area_type_id",
      });
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

      let bb = bbox(areas);
      map.fitBounds([bb[0], bb[1], bb[2], bb[3]], {
        padding: 16,
      });

      map.on("click", "tnris-collection-areas", this.onMapAreaClick);
      map.on("mousemove", "tnris-collection-areas", this.onMapAreaMove);
      map.on("mouseleave", "tnris-collection-areas", this.onMapAreaLeave);
    }
  };

  public removeAreaSelection = (map, opt) => {
    const selectedAreas = this.selectedAreas;
    selectedAreas.update((s) => s.filter((v) => v.value != opt.value));
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
    const selectedAreas = get(this.selectedAreas);
    if (selectedAreas.some((cur) => cur.value == opt.value)) {
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
