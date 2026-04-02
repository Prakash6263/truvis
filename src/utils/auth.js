export const getToken = () => {
  return localStorage.getItem("token")
}

export const getUser = () => {
  try {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error("[v0] Error parsing user data:", error)
    return null
  }
}

export const isAuthenticated = () => {
  const token = getToken()
  return !!token
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export const setToken = (token) => {
  localStorage.setItem("token", token)
}

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const getAuthHeaders = () => {
  const token = getToken()
  const headers = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
    console.log("[v0] Token found, adding Authorization header")
  } else {
    console.warn("[v0] No token found in localStorage")
  }

  return headers
}
