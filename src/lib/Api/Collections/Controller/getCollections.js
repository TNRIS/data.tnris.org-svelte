import { query } from "svelte-pathfinder";
import bboxPolygon from "@turf/bbox-polygon";
import { derived } from "svelte/store";

const GET_COLLECTIONS_URL = "https://api.tnris.org/api/v1/collections_catalog";
const GET_COLLECTION_BY_ID_URL = "https://api.tnris.org/api/v1/collections";
const GET_HISTORICAL_COLLECTION_BY_ID_URL =
  "https://api.tnris.org/api/v1/historical/collections";

//export const catalogParamsStore = createCatalogParams();

//keep pagination params separate from filter params
//to allow for distinct side effects.
//ie. if filters change, pagination/offset needs to be restored to zero.
//if pagination was included in filters, an infinite loop would be created
//reseting offset to zero forever.
export const catalogPaginationParamsStore = derived([query], ([$query]) => {
  const limit =
    $query.params.inc !== undefined
      ? `limit=${$query.params.inc}`
      : `limit=${24}`;
  const offset =
    $query.params.pg !== undefined
      ? `&offset=${
          (Number($query.params.pg) - 1) *
          ($query.params.inc !== undefined ? Number($query.params.inc) : 24)
        }`
      : `&offset=${0}`;
  return `${limit}${offset}`;
});

export const catalogFilterParamsStore = derived([query], ([$query]) => {
  //TODO: reset offset to return pagination to first page
  //when filters are changed

  //create bboxPolygon and parse bboxPolygon into
  //POINT() format required by Django API
  const bbox =
    $query.params.geo !== undefined &&
    String($query.params?.geo)?.split(",").length === 4
      ? // @ts-ignore
        bboxPolygon(String($query.params.geo).split(",")).geometry.coordinates
      : null;

  let bboxParam;
  if (bbox) {
    bboxParam = bbox.map((v) => v.map((c) => c.join(" ")));
  }

  const ordering =
    $query.params.sort !== undefined
      ? `&ordering=${$query.params.sort}`
      : `&ordering=-acquisition_date`;
  const search =
    $query.params.s !== undefined && String($query.params.s).length > 0
      ? `&search=${$query.params.s}`
      : "";
  const the_geom =
    $query.params.geo !== undefined &&
    String($query.params.geo).split(",").length == 4
      ? `&the_geom__intersects=POLYGON((${bboxParam}))`
      : "";
  const avail =
    $query.params.availability !== undefined &&
    String($query.params.availability).split(",").length > 0
      ? `&availability__icontains=${$query.params.availability}`
      : "";
  const cat =
    $query.params.category !== undefined &&
    String($query.params.category).split(",").length > 0
      ? `&category__icontains=${$query.params.category}`
      : "";
  const ft =
    $query.params.file_type !== undefined &&
    String($query.params.file_type).split(",").length > 0
      ? `&file_type__icontains=${$query.params.file_type}`
      : "";
  const dr_low =
    $query.params.dates !== undefined &&
    String($query.params.dates).split(",").length > 0
      ? `&acquisition_date__gte=01-01-${String($query.params.dates).split(",")[0]}`
      : "";
  const dr_high =
    $query.params.dates !== undefined &&
    String($query.params.dates).split(",").length > 0
      ? `&acquisition_date__lte=01-01-${String($query.params.dates).split(",")[1]}`
      : "";

  const qs = `${ordering}${search}${the_geom}${avail}${cat}${ft}${dr_low}${dr_high}`;
  return qs;
});

export const catalogParamsStore = derived(
  [catalogPaginationParamsStore, catalogFilterParamsStore],
  ([$catalogPaginationParamsStore, $catalogFilterParamsStore]) => {
    return `${$catalogPaginationParamsStore}${$catalogFilterParamsStore}`;
  }
);

export const getCollections = async (queryString) => {
  const resp = await fetch(`${GET_COLLECTIONS_URL}?${queryString}`, {cache: "no-cache"});
  if (resp.ok == false) {
    throw new Error(`Error retreiving collection catalog`);
  }
  return resp.json();
};

export const getCollectionById = async (collection_id, signal) => {
  const resp = await fetch(`${GET_COLLECTION_BY_ID_URL}/${collection_id}`, {signal});

  if (resp.ok == false) {
    const resp = await fetch(
      `${GET_HISTORICAL_COLLECTION_BY_ID_URL}/${collection_id}`, {cache: "no-cache"}
    );

    if (resp.ok == false) {
      throw new Error(`Error retreiving collection with id ${collection_id}`);
    }

    return resp.json();
  }

  return resp.json();
};
