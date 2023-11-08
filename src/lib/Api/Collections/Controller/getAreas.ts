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

  let fetchJobs = urls.map(async (url) => {
    const r = await fetch(url, { signal });
    const d = await r.json();

    if (r.ok) {
      return d;
    } else {
      throw new Error(d);
    }
  });

  let results: PromiseSettledResult<any>[] = (await Promise.allSettled([...fetchJobs]).then(r => r)).map(v => v.value);

  return {
    qquad: results[0],
    quad: results[1],
    counties: results[2],
    blocks: results[3],
    twoFiftyK: results[4],
    state: results[5],
  };
};
