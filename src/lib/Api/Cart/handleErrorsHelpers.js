export function handleErrorsHelper(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
}