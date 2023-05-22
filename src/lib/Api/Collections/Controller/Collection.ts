import bbox from "@turf/bbox";
import type { GeoJSONSourceSpecification, Map } from "maplibre-gl";
import { getMapAreasByCollectionId } from "./getAreas";
import { getCollectionById } from "./getCollections";

export class Collection {
  constructor(collection_id: string) {
    this.collection_id = collection_id;
    this.details = this.getCollectionDetails();
    this.areas = this.getResourceAreas();
    this.selectedAreas = [];
  }
  collection_id: string = null;
  details = null;
  areas = null;
  selectedAreas = [];
  areaSearch = "";
  sigCtrl = new AbortController();
  sig = this.sigCtrl.signal;

  getResourceAreas = async () =>
    await getMapAreasByCollectionId(this.collection_id, this.sig);
  getCollectionDetails = async () =>
    await getCollectionById(this.collection_id, this.sig);

  public addCollectionAreasToMap = (map: Map, areas) => {
    console.log("ADD COLLECTION TO MAP...")
    if (map && map.loaded()) {
      if (map.getLayer("tnris-collection-areas") !== undefined) {
        map.removeLayer("tnris-collection-areas");
        map.removeSource("tnris-collection-areas");
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
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            "#888",
            "#fff",
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            0.4,
          ],
          "fill-outline-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            '#fof',
            '#444',
          ],
        },
      });

      let bb = bbox(areas);
      map.fitBounds([bb[0], bb[1], bb[2], bb[3]], {
        padding: 16,
      });
    }
  };

  public removeCollectionAreasFromMap = (map: Map) => {
    if (
      map &&
      map.loaded() &&
      map.getLayer("tnris-collection-areas") != undefined
    ) {
      map.removeLayer(`tnris-collection-areas`);
      map.removeSource(`tnris-collection-areas`);
    }
  };
}
