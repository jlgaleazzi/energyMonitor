export async function handleResponse(response) {
  debugger;
  if (response.json) return response.json();
  throw new Error("Network response was not ok,");
}

export function handleError(error) {
  console.error("API call failed " + error);
  throw error;
}
