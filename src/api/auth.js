// API functions for authentication endpoints
const API_BASE_URL = "https://truvis.onrender.com"
// const API_BASE_URL = "http://localhost:5000"

// Register user
export const registerUser = async (userData) => {
  try {
    console.log("[v0] Making signup API call to:", `${API_BASE_URL}/auth/signup`)
    console.log("[v0] Request data:", userData)

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response ok:", response.ok)

    const data = await response.json()
    console.log("[v0] Response data:", data)

    // Check data.status instead of response.ok since API returns 200 for both success and error
    return {
      success: data.status === "success",
      data,
    }
  } catch (error) {
    console.error("[v0] API call failed:", error)
    console.error("[v0] Error message:", error.message)
    return {
      success: false,
      data: { message: "Network error. Please try again." },
    }
  }
}

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    // Check data.status instead of response.ok since API returns 200 for both success and error
    return {
      success: data.status === "success",
      data,
    }
  } catch (error) {
    return {
      success: false,
      data: { message: "Network error. Please try again." },
    }
  }
}

// Get user profile (example for future use)
export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    // Check data.status instead of response.ok since API returns 200 for both success and error
    return {
      success: data.status === "success",
      data,
    }
  } catch (error) {
    return {
      success: false,
      data: { message: "Network error. Please try again." },
    }
  }
}

// Update user profile
export const updateUserProfile = async (token, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    // Check data.status instead of response.ok since API returns 200 for both success and error
    return {
      success: data.status === "success",
      data,
    }
  } catch (error) {
    return {
      success: false,
      data: { message: "Network error. Please try again." },
    }
  }
}

