// Updated with your specific Sheety URL
const SHEETY_API_URL =
  "https://api.sheety.co/d61260f6816cba31f23a7b2706a55d31/videos/sheet1";

/**
 * Fetch many videos (with optional filtering by category or search term)
 */
export const fetchVideos = async (category = "All", searchTerm = "") => {
  try {
    const response = await fetch(SHEETY_API_URL);

    if (!response.ok) {
      throw new Error(`Sheety Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Since your tab name is "sheet1", Sheety returns the array inside data.sheet1
    let filtered = data.sheet1 || [];

    // Filter by Category
    if (category && category !== "All") {
      filtered = filtered.filter(
        (v) => v.tag?.toLowerCase() === category.toLowerCase(),
      );
    }

    // Filter by Search Term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.title?.toLowerCase().includes(term) ||
          v.author?.toLowerCase().includes(term),
      );
    }

    return filtered;
  } catch (error) {
    console.error("Failed to fetch videos from Sheety:", error);
    return [];
  }
};

/**
 * Fetch a specific video by its Sheety Row ID
 */
export const fetchVideoById = async (id) => {
  try {
    // Sheety provides a direct endpoint for specific rows: base_url/id
    const response = await fetch(`${SHEETY_API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Video not found");
    }

    const data = await response.json();

    // Sheety returns a single object nested under the singular name 'sheet1'
    return data.sheet1;
  } catch (error) {
    console.error(`Error fetching video with ID ${id}:`, error);
    return null;
  }
};
