const API_BASE = "https://truvis.onrender.com"
// const API_BASE = "http://localhost:5000"

// Read the JWT from localStorage for testing. Set it via:
// localStorage.setItem("authToken", "YOUR_JWT_HERE")
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

export function hasSavedCardLocal() {
  try {
    return typeof localStorage !== "undefined" && localStorage.getItem("hasSavedCard") === "true"
  } catch {
    return false
  }
}

export function markSavedCardLocal(value = true) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("hasSavedCard", value ? "true" : "false")
    }
  } catch {}
}

// 1) POST /payments/create-customer
export async function apiCreateCustomer() {
  const token = getAuthToken()
  if (!token)
    throw new Error("Missing auth token. Set localStorage.setItem('token', '<JWT>') before calling payments APIs.")
  const res = await fetch(`${API_BASE}/wallet/create-payment-intent`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`create-customer failed: ${res.status} ${t}`)
  }
  return res.json()
}

// 2) POST /payments/save-card  -> returns { clientSecret }
export async function apiSaveCard() {
  const token = getAuthToken()
  console.log("apiSaveCard-token",token)
  if (!token)
    throw new Error("Missing auth token. Set localStorage.setItem('token', '<JWT>') before calling payments APIs.")
  const res = await fetch(`${API_BASE}/wallet/saved-cards`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`save-card failed: ${res.status} ${t}`)
  }
  return res.json()
}

// 3) POST /payments/attach-card  body: { paymentMethodId }
export async function apiAttachCard(paymentMethodId) {
  const token = getAuthToken()
  if (!token)
    throw new Error("Missing auth token. Set localStorage.setItem('token', '<JWT>') before calling payments APIs.")
  const res = await fetch(`${API_BASE}/payments/attach-card`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentMethodId }),
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`attach-card failed: ${res.status} ${t}`)
  }
  return res.json()
}

// 4) POST /payments/buy-coins  body: { amountInCents, coins }
export async function apiBuyCoins(amountInCents, coins) {
  const token = getAuthToken()
  if (!token)
    throw new Error("Missing auth token. Set localStorage.setItem('token', '<JWT>') before calling payments APIs.")
  const res = await fetch(`${API_BASE}/payments/buy-coins`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amountInCents, coins }),
  })
  const text = await res.text()
  let data = {}
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    // keep data as {}
  }
  if (!res.ok) {
    // Bubble up server message when present (e.g., "No card saved. Please save card first.")
    const msg = data?.message || `buy-coins failed: ${res.status} ${text}`
    throw new Error(msg)
  }
  return data
}
