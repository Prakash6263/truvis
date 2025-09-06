// API configuration
export const API_CONFIG = {
  BASE_URL: "https://truvis.onrender.com",
  // BASE_URL: "http://localhost:5000",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      SIGNUP: "/auth/signup",
      PROFILE: "/auth/profile",
    },
  },
  HEADERS: {
    "Content-Type": "application/json",
  },
}

// Helper function to create API URLs
export const createApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}
