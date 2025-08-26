export const getToken = () => {
  return localStorage.getItem("token")
}

export const getUser = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
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
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}
