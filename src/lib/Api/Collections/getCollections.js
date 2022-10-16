const GET_COLLECTIONS_URL =
  "https://api.tnris.org/api/v1/collections_catalog?limit=50&ordering=-acquisition_date";

export const getCollections = async () => {
  return fetch(GET_COLLECTIONS_URL).then((data) => {
    return data.json();
  });
};
/* 
export const queryCollections = useQuery("collectionCatalog", () => {
  return getCollections();
}); */
