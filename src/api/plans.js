// const API_BASE_URL = "http://localhost:5000"
const API_BASE_URL = "https://aitechnotech.in/Truvis"

function getAuthToken() {
  try {
    return (
      (typeof localStorage !== "undefined" && (localStorage.getItem("token") || localStorage.getItem("authToken"))) ||
      ""
    )
  } catch {
    return ""
  }
}

export async function fetchPlans() {
  try {
    const token = getAuthToken()
    const headers = {
      accept: "application/json",
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(`${API_BASE_URL}/plans`, {
      method: "GET",
      headers,
    })

    if (!res.ok) return { success: false, plans: [], message: `HTTP ${res.status}` }

    const data = await res.json()
    // console.log("[v0] Plans API response:", data)

    if (data.status === 1 && Array.isArray(data.plans)) {
      return {
        success: true,
        plans: data.plans,
        total: data.total,
        user_id: data.user_id,
      }
    }

    // Fallback to old response formats for backward compatibility
    let plans = []
    if (Array.isArray(data)) plans = data
    else if (Array.isArray(data?.plans)) plans = data.plans
    else if (Array.isArray(data?.data)) plans = data.data

    return { success: true, plans }
  } catch (err) {
    console.error("[v0] fetchPlans error:", err)
    return { success: false, plans: [], message: err?.message || "Network error" }
  }
}

export async function fetchPlanById(planId) {
  if (!planId) return { success: false, plan: null, message: "Missing plan id" }
  try {
    const token = getAuthToken()
    const headers = {
      accept: "application/json",
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(`${API_BASE_URL}/plans/${encodeURIComponent(planId)}`, {
      method: "GET",
      headers,
    })

    const text = await res.text()
    let data = {}
    try {
      data = text ? JSON.parse(text) : {}
    } catch {}

    if (!res.ok) {
      return {
        success: false,
        plan: null,
        message: data?.message || `HTTP ${res.status}: ${text || "Failed to fetch plan"}`,
      }
    }

    if (data.status === 1 && data.plan) {
      return { success: true, plan: data.plan }
    }

    const plan =
      (data && (data.plan || data.data)) || (data && typeof data === "object" && !Array.isArray(data) ? data : null)
    return { success: true, plan }
  } catch (err) {
    console.error("[v0] fetchPlanById error:", err)
    return { success: false, plan: null, message: err?.message || "Network error" }
  }
}

export async function buyPlan(planId) {
  const token = getAuthToken()
  if (!token) return { success: false, message: "Missing auth token" }
  try {
    const res = await fetch(`${API_BASE_URL}/plans/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ planId }),
    })
    const text = await res.text()
    let data = {}
    try {
      data = text ? JSON.parse(text) : {}
    } catch {}
    if (!res.ok) {
      return { success: false, message: data?.message || `HTTP ${res.status}: ${text || "Failed to buy plan"}` }
    }
    const ok = data?.status === true || data?.status === 1 || res.ok
    return { success: ok, ...data }
  } catch (err) {
    console.error("[v0] buyPlan error:", err)
    return { success: false, message: err?.message || "Network error" }
  }
}

export async function fetchMyPurchases() {
  try {
    const token =
      (typeof localStorage !== "undefined" && (localStorage.getItem("token") || localStorage.getItem("authToken"))) ||
      ""

    if (!token) {
      return { success: false, history: [], message: "Missing auth token" }
    }

    const res = await fetch(`${API_BASE_URL}/plans/my-purchases`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const text = await res.text()
    let data = {}
    try {
      data = text ? JSON.parse(text) : {}
    } catch {
      // ignore JSON parse error
    }

    if (!res.ok) {
      return {
        success: false,
        history: [],
        message: data?.message || `HTTP ${res.status}: ${text || "Failed to fetch purchases"}`,
      }
    }

    const history = Array.isArray(data?.history) ? data.history : []
    return { success: true, history }
  } catch (err) {
    console.error("[v0] fetchMyPurchases error:", err)
    return { success: false, history: [], message: err?.message || "Network error" }
  }
}
