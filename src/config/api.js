// Centralized API configuration

// RAWG API Key from environment variables
export const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY || "";
export const RAWG_BASE_URL = "https://api.rawg.io/api";

/**
 * Helper function to build RAWG URLs with API key
 * @param {string} endpoint - The API endpoint (e.g. "games", "games/123")
 * @param {Object} params - Optional query parameters
 * @returns {string} Complete URL with API key
 */
export function getRawgUrl(endpoint, params = {}) {
    // Make sure the endpoint doesn't start with "/"
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint.substring(1) : endpoint;

    // Build the base URL with endpoint and API key
    let url = `${RAWG_BASE_URL}/${cleanEndpoint}?key=${RAWG_API_KEY}`;

    // Add any query parameters
    Object.entries(params).forEach(([key, value]) => {
        url += `&${key}=${value}`;
    });

    return url;
}