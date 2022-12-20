const MAPSERVER_AREAS_BASE_URL = `https://mapserver.tnris.org/?map=/tnris_mapfiles/download_areas.map&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=collection_query&outputformat=geojson&SRSNAME=EPSG:4326`;
//Append areatype and collectionid like:
//&AreaType=qquad&Collection=a6a703ba-df8b-4d1b-8d4c-ece8ae786505

export const getQQuadsByCollectionId = async (collection_id) => {
  const resp = await fetch(
    `${MAPSERVER_AREAS_BASE_URL}&AreaType=qquad&Collection=${collection_id}`
  );

  if (resp.ok == false) {
    throw new Error(
      `Error retreiving qquad download areas from MapServer with collection id ${collection_id}`
    );
  }

  return resp.json();
};

export const getQuadsByCollectionId = async (collection_id) => {
  const resp = await fetch(
    `${MAPSERVER_AREAS_BASE_URL}&AreaType=quad&Collection=${collection_id}`
  );

  if (resp.ok == false) {
    throw new Error(
      `Error retreiving quad download areas from MapServer with collection id ${collection_id}`
    );
  }

  return resp.json();
};

export const getCountiesByCollectionId = async (collection_id) => {
  const resp = await fetch(
    `${MAPSERVER_AREAS_BASE_URL}&AreaType=county&Collection=${collection_id}`
  );

  if (resp.ok == false) {
    throw new Error(
      `Error retreiving county download areas from MapServer with collection id ${collection_id}`
    );
  }

  return resp.json();
};

export const getBlocksByCollectionId = async (collection_id) => {
  const resp = await fetch(
    `${MAPSERVER_AREAS_BASE_URL}&AreaType=block&Collection=${collection_id}`
  );

  if (resp.ok == false) {
    throw new Error(
      `Error retreiving block download areas from MapServer with collection id ${collection_id}`
    );
  }

  return resp.json();
};

export const get250kByCollectionId = async (collection_id) => {
  const resp = await fetch(
    `${MAPSERVER_AREAS_BASE_URL}&AreaType=250k&Collection=${collection_id}`
  );

  if (resp.ok == false) {
    throw new Error(
      `Error retreiving 250km download areas from MapServer with collection id ${collection_id}`
    );
  }

  return resp.json();
};

export const getStateByCollectionId = async (collection_id) => {
  const resp = await fetch(
    `${MAPSERVER_AREAS_BASE_URL}&AreaType=state&Collection=${collection_id}`
  );

  if (resp.ok == false) {
    throw new Error(
      `Error retreiving statewide download area from MapServer with collection id ${collection_id}`
    );
  }

  return resp.json();
};
