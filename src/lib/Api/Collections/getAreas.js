const MAPSERVER_AREAS_BASE_URL = `https://mapserver.tnris.org/?map=/tnris_mapfiles/download_areas.map&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=collection_query&outputformat=geojson&SRSNAME=EPSG:4326`;
//Append areatype and collectionid like:
//&AreaType=qquad&Collection=a6a703ba-df8b-4d1b-8d4c-ece8ae786505
export const getMapAreasByCollectionId = async (collection_id, signal) => {
  const qquadUrl = `${MAPSERVER_AREAS_BASE_URL}&AreaType=qquad&Collection=${collection_id}`;
  const quadUrl = `${MAPSERVER_AREAS_BASE_URL}&AreaType=quad&Collection=${collection_id}`;
  const countiesUrl = `${MAPSERVER_AREAS_BASE_URL}&AreaType=county&Collection=${collection_id}`;
  const blocksUrl = `${MAPSERVER_AREAS_BASE_URL}&AreaType=block&Collection=${collection_id}`;
  const twoFiftyKUrl = `${MAPSERVER_AREAS_BASE_URL}&AreaType=250k&Collection=${collection_id}`;
  const stateUrl = `${MAPSERVER_AREAS_BASE_URL}&AreaType=state&Collection=${collection_id}`;

  const urls = [
    qquadUrl,
    quadUrl,
    countiesUrl,
    blocksUrl,
    twoFiftyKUrl,
    stateUrl,
  ];

  let fetchJobs = urls.map((url) =>
    fetch(url, { signal })
      .then((v) => v.json())
      .catch((e) => console.error(e?.message))
  );

  let results = Promise.all([...fetchJobs]);

  return results.then((v) => v).then((r) => r);
};
