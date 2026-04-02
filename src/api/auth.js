// api/auth.js
// API functions for authentication endpoints

const API_BASE_URL = "https://aitechnotech.in/Truvis"
// const API_BASE_URL = "http://localhost:5000"

// Register user
export const registerUser = async (userData) => {
  try {
    const signupUrl = `${API_BASE_URL}/signup`
    console.log("[v0] Making signup API call to:", signupUrl)
    console.log("[v0] Request data:", userData)

    const formData = new FormData()
    formData.append("name", userData.name)
    formData.append("email", userData.email)
    formData.append("password", userData.password)

    const response = await fetch(signupUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
    })

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response ok:", response.ok)

    const data = await response.json()
    console.log("[v0] Response data:", data)

    return {
      success: data.status === 1,
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
    const loginUrl = `${API_BASE_URL}/login`
    console.log("[v0] Making login API call to:", loginUrl)
    console.log("[v0] Credentials:", { email: credentials.email })

    // Use FormData to match how you were sending it before (server accepts it)
    const formData = new FormData()
    formData.append("email", credentials.email)
    formData.append("password", credentials.password)

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
    })

    console.log("[v0] Login response status:", response.status)
    const data = await response.json()
    console.log("[v0] Login response raw data:", JSON.stringify(data, null, 2))

    // NORMALIZE token fields so client code can reliably use `data.token`
    // Some APIs return access_token, others return token — handle both.
    const normalizedToken = data.access_token || data.accessToken || data.token || data.jwt || null

    // attach a normalized token field so callers can safely expect `data.token`
    const normalizedData = { ...data, token: normalizedToken }

    console.log("[v0] Normalized token:", normalizedToken)
    console.log("[v0] User ID from response (raw):", data.user_id || data.userId)
    console.log("[v0] Name from response (raw):", data.name)

    // New API returns status: 1 for success
    return {
      success: data.status === 1,
      data: normalizedData,
    }
  } catch (error) {
    console.error("[v0] Login API failed:", error)
    console.error("[v0] Error stack:", error.stack)
    return {
      success: false,
      data: { message: "Network error. Please try again." },
    }
  }
}

// Get user profile (example for future use)
export const getUserProfile = async () => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token")

    if (!token) {
      return {
        success: false,
        data: { message: "No authentication token found" },
      }
    }

    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    // If token is invalid (401), clear it from localStorage
    if (response.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      return {
        success: false,
        data: { message: "Invalid or expired token" },
      }
    }

    // API returns status: 1 for success, profile object contains user data
    return {
      success: data.status === 1,
      data: {
        ...data,
        user: data.profile, // Map profile to user for backward compatibility
      },
    }
  } catch (error) {
    return {
      success: false,
      data: { message: "Network error. Please try again." },
    }
  }
}

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token")

    if (!token) {
      return {
        success: false,
        data: { message: "No authentication token found" },
      }
    }

    // Build form data as x-www-form-urlencoded
    const formBody = new URLSearchParams()
    if (userData.name) formBody.append("name", userData.name)
    if (userData.email) formBody.append("email", userData.email)
    if (userData.phone) formBody.append("phone", userData.phone)
    if (userData.country_code) formBody.append("country_code", userData.country_code)

    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    })

    const data = await response.json()

    // If token is invalid (401), clear it from localStorage
    if (response.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      return {
        success: false,
        data: { message: "Invalid or expired token" },
      }
    }

    // API returns status: 1 for success
    return {
      success: data.status === 1,
      data: {
        ...data,
        user: data.profile, // Map profile to user for backward compatibility
      },
    }
  } catch (error) {
    return {
      success: false,
      data: { message: "Network error. Please try again." },
    }
  }
}

// Get wallet balance
export const getWalletBalance = async () => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      return {
        success: false,
        data: { message: "No authentication token found" },
      }
    }

    const response = await fetch(`${API_BASE_URL}/wallet/balance`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    // If token is invalid (401), clear it from localStorage
    if (response.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      return {
        success: false,
        data: { message: "Invalid or expired token" },
      }
    }

    return {
      success: data.status === 1,
      data,
    }
  } catch (error) {
    return {
      success: false,
      data: { message: "Network error. Please try again." },
    }
  }
}

// Get wallet history
export const getWalletHistory = async () => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      return {
        success: false,
        data: { message: "No authentication token found" },
        history: [],
      }
    }

    const response = await fetch(`${API_BASE_URL}/wallet/history`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    // If token is invalid (401), clear it from localStorage
    if (response.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      return {
        success: false,
        data: { message: "Invalid or expired token" },
        history: [],
      }
    }

    return {
      success: data.status === 1,
      data,
      history: Array.isArray(data.history) ? data.history : [],
    }
  } catch (error) {
    return {
      success: false,
      data: { message: "Network error. Please try again." },
      history: [],
    }
  }
}
