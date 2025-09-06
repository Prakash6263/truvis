// Frontend API client for Risk Management flows
// Mirrors the style of auth-gyOSj.js and centralizes fetch, auth, and error handling.

const RAW_API_BASE = (
  process.env.REACT_APP_API_BASE_URL ||
  process.env.VITE_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "")

function ensureRisksBase(base) {
  const b = String(base || "").replace(/\/+$/, "")
  // if it already ends with /api/risks keep it, otherwise append
  return /\/api\/risks$/.test(b) ? b : `${b}/api/risks`
}

const API_BASE_URL = ensureRisksBase(RAW_API_BASE)

/**
 * Safely join base and path:
 */
function joinUrl(base, path) {
  const b = String(base || "").replace(/\/+$/, "")
  const p = String(path || "").replace(/^\/+/, "")
  return `${b}/${p}`
}

// Internal helper to get bearer token
function getToken() {
  try {
    return localStorage.getItem("token")
  } catch {
    return null
  }
}

// Internal: build query string from object
function toQuery(params = {}) {
  const q = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return
    q.set(k, String(v))
  })
  const s = q.toString()
  return s ? `?${s}` : ""
}

// Centralized id extractor from varied backend shapes
function extractId(res) {
  const d = res?.data
  return d?.data?._id || d?.data?.id || d?._id || d?.id || d?.risk?._id || res?.id || res?.assessmentId || null
}

// Internal: unified fetch wrapper with JSON handling and 401 cleanup
async function apiFetch(path, { method = "GET", body, headers = {}, isForm = false, responseType = "json" } = {}) {
  const token = getToken()
  const finalHeaders = {
    ...(isForm ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  }

  const url = joinUrl(API_BASE_URL, path)

  console.log("[v0] apiFetch:", method, url)

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  })

  if (responseType === "blob") {
    const blob = await res.blob().catch(() => new Blob())
    if (!res.ok) {
      return { success: false, data: { message: "Request failed", blob }, status: res.status }
    }
    return { success: true, data: blob, status: res.status }
  }

  let data
  const contentType = res.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    data = await res.json().catch(() => ({}))
  } else {
    data = await res.text().catch(() => "")
  }

  if (res.status === 401) {
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    } catch {}
    return { success: false, data: { message: "Invalid or expired token" }, status: 401 }
  }

  const success = typeof data === "object" && data !== null && "status" in data ? data.status === "success" : res.ok
  return { success, data, status: res.status }
}

// Helpers to normalize shapes coming back from your current backend
function normalizeRisk(r) {
  if (!r) return null
  return {
    id: r._id || r.id,
    title: r.title || r.systemName || "Risk",
    impact: r.impact || "Moderate",
    likelihood: r.likelihood || "Likely",
    riskLevel: r.riskLevel || r.level || "Mid",
    analysis: r.analysis || "",
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    system: r.system || "Mid",
  }
}

function ensureString(val) {
  if (val === null || val === undefined) return ""
  if (typeof val === "string") return val
  try {
    return JSON.stringify(val, null, 2)
  } catch {
    return String(val)
  }
}

function formatTime(isoLike) {
  if (!isoLike) return new Date().toLocaleTimeString()
  const d = new Date(isoLike)
  return isNaN(d.valueOf()) ? new Date().toLocaleTimeString() : d.toLocaleTimeString()
}

/**
 * Step 1: Create a risk (optionally with files)
 * If files are provided, send multipart/form-data per backend route: POST /risk (upload.array('files'))
 */
export async function createAssessment(payload = {}, files) {
  // Build a safe payload with a guaranteed title
  const data = { ...(payload || {}) }
  if (!data.title || !String(data.title).trim()) {
    data.title =
      data.systemName?.toString().trim() ||
      data.name?.toString().trim() ||
      data.businessFunction?.toString().trim() ||
      "Untitled Assessment"
  }

  if (files && files.length) {
    const form = new FormData()
    Object.entries(data).forEach(([k, v]) => form.append(k, v ?? ""))
    Array.from(files).forEach((file) => form.append("files", file))
    const res = await apiFetch("/", { method: "POST", body: form, isForm: true })
    const id = extractId(res)
    return { ...res, id }
  }

  const res = await apiFetch("/", { method: "POST", body: data })
  const id = extractId(res)
  return { ...res, id }
}

// Step 1 legacy alias retained for compatibility; backend has no separate docs endpoint.
// We no-op here and report success so UI flow continues without creating a duplicate record.
export async function uploadDocuments(_assessmentId, _files) {
  return { success: true, data: { message: "Files will be sent with createAssessment()" } }
}

// Some code imports `uploadSystemDocs`. Reuse our uploadDocuments (no-op wrapper for this backend).
export { uploadDocuments as uploadSystemDocs }

// Some code imports `getRiskRegister(assessmentId, params)`.
// Our current `listRisks` signature accepts an object; wrap to keep the expected callsite shape.
export async function getRiskRegister(assessmentId, params = {}) {
  const res = await apiFetch(`/${assessmentId}/register${toQuery(params)}`, { method: "GET" })
  if (!res.success) return res
  return { success: true, data: res.data?.data || res.data, status: res.status }
}

/**
 * Step 2: Reasoning log → call analyze endpoint and adapt to log entries
 * Backend: POST /:id/analyze returns { status, message, data: { analysis: { reasoningLogs: [...] } } }
 */
export async function getReasoningLog(assessmentId, { autoAnalyze = true } = {}) {
  // First, fetch existing logs
  let res = await apiFetch(`/${assessmentId}/logs`, { method: "GET" })
  if (!res.success) return res

  let raw = res?.data?.data || res?.data || []

  // If no logs yet and autoAnalyze enabled, trigger analysis then refetch logs
  if (Array.isArray(raw) && raw.length === 0 && autoAnalyze) {
    await apiFetch(`/${assessmentId}/analyze`, { method: "POST" })
    res = await apiFetch(`/${assessmentId}/logs`, { method: "GET" })
    if (!res.success) return res
    raw = res?.data?.data || res?.data || []
  }

  const log = (Array.isArray(raw) ? raw : []).map((entry) => ({
    at: entry?.at || entry?.time || entry?.timestamp || entry?.createdAt || null,
    time: formatTime(entry?.at || entry?.time || entry?.timestamp || entry?.createdAt),
    author: entry?.author || "ai",
    message: ensureString(entry?.message ?? entry?.text ?? entry?.content ?? entry),
  }))

  return { success: true, data: log, status: res.status }
}

/**
 * Step 2: Submit clarifications — backend doesn’t accept them yet, so re-run analyze and attach context.
 */
export async function submitClarifications(assessmentId, answers = {}) {
  return apiFetch(`/${assessmentId}/clarifications/answer`, { method: "POST", body: { ...answers } })
}

/**
 * Step 3: Risk register → GET /risk and normalize
 */
export async function listRisks({ page, limit, ..._params } = {}) {
  const res = await apiFetch(`/`, { method: "GET" })
  if (!res.success) return res
  const arr = Array.isArray(res.data?.data) ? res.data.data : Array.isArray(res.data) ? res.data : []
  const items = arr.map(normalizeRisk)
  const p = Number(page || 1)
  const l = Number(limit || items.length || 10)
  const start = (p - 1) * l
  const paged = items.slice(start, start + l)
  return { success: true, data: { items: paged, total: items.length, page: p, limit: l }, status: res.status }
}

/**
 * Step 3: Reassess/upgrade → POST /risk/:id/upgrade
 */
export async function reassessRisks(assessmentIdOrParams, maybeBody = {}) {
  let id
  if (typeof assessmentIdOrParams === "object" && assessmentIdOrParams !== null) {
    id = assessmentIdOrParams.assessmentId
  } else {
    id = assessmentIdOrParams
  }
  return apiFetch(`/${id}/upgrade`, { method: "POST", body: maybeBody })
}

/**
 * Step 3: Complete assessment — backend has no endpoint; return success to allow navigation.
 */
export async function completeAssessment(_assessmentId) {
  return { success: true, data: { message: "Completed (client-side)" }, status: 200 }
}

/**
 * Final: Dashboard — derive metrics from GET /risk
 */
export async function getDashboard() {
  const [summaryRes, topRes] = await Promise.all([
    apiFetch("/_dashboard/summary", { method: "GET" }),
    apiFetch("/_dashboard/top-risks", { method: "GET" }),
  ])

  if (!summaryRes.success) return summaryRes
  const summary = summaryRes.data?.data || summaryRes.data
  let topRisks = []
  if (topRes.success) {
    const list = topRes.data?.data || topRes.data || []
    topRisks = list
      .map((r) => ({ title: r.title || r.name || "Risk", severity: r.severity || r.riskLevel || "High" }))
      .slice(0, 5)
  }

  return {
    success: true,
    data: {
      totalAssessments: summary?.totalAssessments ?? summary?.count ?? 0,
      totalRisks: summary?.totalRisks ?? summary?.count ?? 0,
      topRisks,
    },
    status: 200,
  }
}

/**
 * Final: Assessments list — adapt risks into a simple table model
 */
export async function listAssessments({ page = 1, limit = 10 } = {}) {
  const res = await listRisks({ page, limit })
  if (!res.success) return res
  const items =
    res.data.items?.map((r) => ({
      id: r.id,
      date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-",
      lastUpdated: r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : "-",
      system: r.riskLevel || "Mid",
    })) || []
  return {
    success: true,
    data: { items, page: res.data.page, limit: res.data.limit, total: res.data.total },
    status: 200,
  }
}

/**
 * Final: Download report — synthesize a text report from analysis and save
 */
export async function downloadAssessmentReport(assessmentId, { save = true } = {}) {
  const res = await apiFetch(`/${assessmentId}/report`, { method: "GET", responseType: "blob" })
  if (!res.success) return res
  const blob = res.data
  const filename = `risk-${assessmentId}.pdf`
  const payload = { blob, filename }
  if (save) saveBlobToFile(payload)
  return { success: true, data: payload, status: 200 }
}

// It wraps downloadAssessmentReport and disables auto-saving so callers can handle the blob.
export function downloadReport(assessmentId) {
  return downloadAssessmentReport(assessmentId, { save: false })
}

export function saveBlobToFile({ blob, filename = "download.txt" }) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export async function getClarifications(assessmentId) {
  const res = await apiFetch(`/${assessmentId}/clarifications`, { method: "GET" })
  if (!res.success) return res
  const raw = res?.data?.data || res?.data || []
  const questions = (Array.isArray(raw) ? raw : []).map((q, idx) => {
    const optionsArr = Array.isArray(q?.options) ? q.options : []
    const options = optionsArr.map((opt) => {
      if (typeof opt === "string") return { value: opt, label: opt }
      return {
        value: opt?.value ?? opt?.id ?? opt?.key ?? String(opt),
        label: opt?.label ?? opt?.text ?? opt?.name ?? String(opt),
      }
    })
    return {
      id: q?.id || q?._id || q?.key || `q${idx + 1}`,
      question: q?.question || q?.text || q?.prompt || "Clarification needed",
      type: q?.type || (options.length ? "single" : "text"),
      options,
      required: !!q?.required,
    }
  })
  return { success: true, data: questions, status: res.status }
}

export const answerClarifications = submitClarifications

export async function analyzeAssessment(assessmentId, body = {}) {
  return apiFetch(`/${assessmentId}/analyze`, { method: "POST", body })
}
