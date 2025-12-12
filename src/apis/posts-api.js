const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchDetailData(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return await response.json();
}
