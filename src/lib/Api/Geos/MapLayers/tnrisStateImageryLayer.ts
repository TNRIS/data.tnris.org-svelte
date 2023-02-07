//for toggleable display of "satellite" imagery of texas

import type { AnySourceData, Layer } from "mapbox-gl";
import type { MapLayer } from "../tnrisMapLayers";

//available globally on map pane
export const TNRIS_IMAGERY_LAYER_ID = "tnris-imagery-layer";
export const TNRIS_IMAGERY_SRC_ID = TNRIS_IMAGERY_LAYER_ID;

////////////START STATE IMAGERY WMS LAYER////////////////////////////////////
const STATE_IMAGERY_WMS_URL =
  "https://imagery.tnris.org/server/services/NAIP/NAIP18_NCCIR_60cm/ImageServer/WMSServer?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=0";
const STATE_IMAGERY_LAYER_ID = "tnris-imagery-layer";
const STATE_IMAGERY_SRC_ID = STATE_IMAGERY_LAYER_ID;
const STATE_IMAGERY_SRC: AnySourceData = {
  id: STATE_IMAGERY_SRC_ID,
  type: "raster",
  tiles: [STATE_IMAGERY_WMS_URL],
  tileSize: 256,
};
const STATE_IMAGERY_LAYER: Layer = {
  id: STATE_IMAGERY_LAYER_ID,
  type: "raster",
  source: STATE_IMAGERY_SRC_ID,
  layout: { visibility: "visible" },
};
export const STATE_IMAGERY_MAPLAYER: MapLayer = {
  id: STATE_IMAGERY_SRC_ID,
  layer: STATE_IMAGERY_LAYER,
  source: STATE_IMAGERY_SRC,
};
////////////END STATE IMAGERY WMS LAYER////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
