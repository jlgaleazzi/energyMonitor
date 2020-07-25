export async function handleResponse(response) {
  if (response.hasOwnProperty("production")) return response.json;
  throw new Error("Network response was not ok,");
}

export function handleError(error) {
  console.error("API call failed " + error);
  throw error;
}
