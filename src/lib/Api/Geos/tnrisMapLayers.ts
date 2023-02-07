import type { AnySourceData, Layer } from "mapbox-gl";
import type { Writable } from "svelte/store";
import { get, writable } from "svelte/store";
import {
  STATE_IMAGERY_MAPLAYER,
  TNRIS_IMAGERY_LAYER_ID,
} from "./MapLayers/tnrisStateImageryLayer";

////////////START TYPES////////////////////////////////////
export type MapLayer = {
  layer: Layer;
  source: AnySourceData;
  id: string;
};
export type MapLayerSet = Array<MapLayer> | [];

////////////END TYPES////////////////////////////////////
/////////////////////////////////////////////////////////

////////////START MAP LAYER STORE////////////////////////

export const mapLayers: Writable<MapLayerSet> = writable([
  STATE_IMAGERY_MAPLAYER,
]);
export const removeMapLayerById = function (
  layers: Writable<MapLayerSet>,
  filterString: string
) {
  let lyrs = get(layers);
  lyrs = lyrs.filter((v) => v.id == filterString);

  return lyrs;
};

/////////////////////////////////////////////////////////

////////////START HELPER FUNCTIONS////////////////////////////////////
export const reorderTnrisLayers = (map) => {
  if (map !== undefined && map !== null) {
    let layers = map.getStyle().layers;

    layers = layers.filter((v) => v.id.includes("tnris"));
    if (layers.length > 0 && layers[0].id !== TNRIS_IMAGERY_LAYER_ID) {
      map.moveLayer(TNRIS_IMAGERY_LAYER_ID, layers[0].id);
    }
  }
};
////////////END HELPER FUNCTIONS////////////////////////////////////
////////////////////////////////////////////////////////////////////
