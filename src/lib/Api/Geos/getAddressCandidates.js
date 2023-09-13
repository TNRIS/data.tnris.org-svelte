//https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?maxSuggestions=5&

const ESRI_DEFAULT_PARAMS = {
  maxSuggestions: 5,
  category: "",
  outFields: "score,extent,location,PlaceName,Place_addr",
  forStorage: "false",
  f: "pjson",
  searchExtent:
    "-104.41351892424672,27.73612413794685,-94.57078680032247,36.19438419954843",
};

export const getAddressCandidates = async (
  searchText = "",
  type = "NOMINATIM"
) => {
  const ESRI_BASE_URI =
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates";

  const NOMINATIM_BASE_URI = `https://nominatim.tnris.org/search/${searchText}?format=geojson&polygon_geojson=1`;

  var esriQueryString = Object.keys(ESRI_DEFAULT_PARAMS)
    .map((key) => `&${key}=${ESRI_DEFAULT_PARAMS[key]}`)
    .join("&");

  if (type == "ESRI") {
    return fetch(
      `${ESRI_BASE_URI}?${esriQueryString}&SingleLine=${searchText}`,{cache: "no-cache"}
    ).then((data) => {
      return data.json();
    });
  }
  if (type == "NOMINATIM") {
    return fetch(NOMINATIM_BASE_URI, {cache: "no-cache"}).then((data) => {
      return data.json();
    });
  }
};
