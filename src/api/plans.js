const API_BASE_URL = "http://localhost:5000"

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
    const res = await fetch(`${API_BASE_URL}/plan/plans`, { method: "GET" })
    if (!res.ok) return { success: false, plans: [], message: `HTTP ${res.status}` }
    const data = await res.json()
    let plans = []
    if (Array.isArray(data)) plans = data
    else if (Array.isArray(data?.plans)) plans = data.plans
    else if (Array.isArray(data?.data)) plans = data.data
    return { success: true, plans }
  } catch (err) {
    return { success: false, plans: [], message: err?.message || "Network error" }
  }
}

export async function fetchPlanById(planId) {
  if (!planId) return { success: false, plan: null, message: "Missing plan id" }
  try {
    const res = await fetch(`${API_BASE_URL}/plan/plans/${encodeURIComponent(planId)}`, { method: "GET" })
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
    const plan =
      (data && (data.plan || data.data)) || (data && typeof data === "object" && !Array.isArray(data) ? data : null)
    return { success: true, plan }
  } catch (err) {
    return { success: false, plan: null, message: err?.message || "Network error" }
  }
}

export async function buyPlan(planId) {
  const token = getAuthToken()
  if (!token) return { success: false, message: "Missing auth token" }
  try {
    const res = await fetch(`${API_BASE_URL}/plan/plans/buy`, {
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
    const ok = data?.status === true || res.ok
    return { success: ok, ...data }
  } catch (err) {
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

    const res = await fetch(`${API_BASE_URL}/plan/my-purchases`, {
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
    return { success: false, history: [], message: err?.message || "Network error" }
  }
}