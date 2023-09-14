const RESOURCES_BASE_URL = "https://api.tnris.org/api/v1/resources";

export const getResourcesByAreaTypeAndCollectionId = async (
  collection_id,
  area_type_id
) => {
  const resp = await fetch(
    `${RESOURCES_BASE_URL}/?area_type_id=${area_type_id}&collection_id=${collection_id}`,
    {cache: "no-cache"}
  );

  if (resp.ok == false) {
    throw new Error(
      `Error retreiving resources for collection ${collection_id} with area type ${area_type_id}`
    );
  }
  return resp.json();
};
