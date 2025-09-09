const API_URL = process.env.REACT_APP_API_URL || "https://truvis.onrender.com"
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export const createAssessment = async (payload, files) => {
  const formData = new FormData()

  // Map fields to new API structure
  formData.append("riskName", payload.title || payload.systemName || "")
  formData.append("system_name", payload.systemName || "")
  formData.append("business_function", payload.businessFunction || "")
  formData.append("technical_functions", payload.technicalFunction || "")
  formData.append("scope_details", payload.useCases || "")
  formData.append("additional_info", payload.additionalInfo || "")

  // Add file if present
  if (files && files.length > 0) {
    formData.append("documentation", files[0])
  }

  const response = await fetch(`${API_URL}/api/riskapi`, {
    method: "POST",
    headers: {
      ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` }),
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  const scopeId = data.data?.response?.scope_id || data.scope_id
  return { id: scopeId, scope_id: scopeId, ...data }
}

export const getReasoningLog = async (scopeId) => {
  const response = await fetch(`${API_URL}/api/riskapi/${scopeId}/analysis`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` }),
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return {
    data: data.data?.analysis?.reasoning_log || [],
    clarifications: data.data?.analysis?.clarifications || {},
  }
}

export const getClarifications = async (scopeId) => {
  const response = await fetch(`${API_URL}/api/riskapi/${scopeId}/analysis`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` }),
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  const clarifications = data.data?.analysis?.clarifications || {}

  // Convert clarifications object to array format for UI
  const questionsArray = Object.entries(clarifications).map(([key, question]) => ({
    id: key,
    question: question,
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  }))

  return { data: questionsArray }
}

export const submitClarifications = async (scopeId, payload) => {
  const response = await fetch(`${API_URL}/api/riskapi/${scopeId}/clarifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` }),
    },
    body: JSON.stringify(payload.answers),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const getRiskAssessment = async (scopeId) => {
  const response = await fetch(`${API_URL}/api/riskapi/${scopeId}/risk-assessment`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` }),
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  console.log("[v0] Raw API response:", data)

  let risks = []
  if (data.data?.risk_register?.raw_response) {
    try {
      let cleanJson = data.data.risk_register.raw_response

      // Remove markdown code blocks more robustly
      cleanJson = cleanJson.replace(/^```json\s*\n?/gm, "")
      cleanJson = cleanJson.replace(/\n?```\s*$/gm, "")
      cleanJson = cleanJson.trim()

      console.log("[v0] Cleaned JSON string:", cleanJson)

      const parsedResponse = JSON.parse(cleanJson)
      console.log("[v0] Parsed response:", parsedResponse)

      risks = parsedResponse.risks || []
      console.log("[v0] Extracted risks array:", risks)
      console.log("[v0] Number of risks found:", risks.length)
    } catch (error) {
      console.error("[v0] Error parsing risk register:", error)
      console.error("[v0] Raw response was:", data.data.risk_register.raw_response)
      try {
        // Sometimes the response might be already parsed
        if (typeof data.data.risk_register.raw_response === "object") {
          risks = data.data.risk_register.raw_response.risks || []
          console.log("[v0] Used object parsing, found risks:", risks.length)
        }
      } catch (secondError) {
        console.error("[v0] Second parsing attempt failed:", secondError)
      }
    }
  } else {
    console.log("[v0] No risk_register.raw_response found in:", data)
  }

  // Map API response to component expected format
  const mappedRisks = risks.map((risk, index) => ({
    id: risk.risk_id || `R${index + 1}`,
    title: risk.risk_scenario_statement || "No title",
    impact: risk.impact || "Unknown",
    likelihood: risk.likelihood || "Unknown",
    riskLevel: risk.risk_level || "Unknown",
  }))

  console.log("[v0] Final mapped risks:", mappedRisks)
  console.log("[v0] Returning data with", mappedRisks.length, "risks")
  return { data: mappedRisks }
}

export const listRisks = async ({ assessmentId, page = 1, limit = 10 }) => {
  const response = await fetch(`${API_URL}/truvis/risk-assessment/${assessmentId}`, {
    method: "POST",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return { data: { items: data.risk_register?.risks || [] } }
}

export const reassessRisks = async ({ assessmentId, riskIds, prompt }) => {
  // Placeholder for risk reassessment
  console.log("[v0] Reassessing risks:", { assessmentId, riskIds, prompt })
  return Promise.resolve()
}

export const completeAssessment = async (assessmentId) => {
  // Placeholder for completing assessment
  console.log("[v0] Completing assessment:", assessmentId)
  return Promise.resolve()
}

export const downloadAssessmentReport = async (assessmentId) => {
  // Placeholder for downloading report
  console.log("[v0] Downloading report for:", assessmentId)
  alert("Report download functionality will be implemented")
}


export const getDashboard = async () => {
  const response = await fetch(`${API_URL}/api/riskapi/stats/overview`, {
    method: "GET",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return {
    data: {
      totalAssessments: data.totalAssessments || 0,
      totalRisks: data.totalRisks || 0,
      top5HighRisks: data.top5HighRisks || [], // Match component expectation
      chartData: data.chartData || [],
    },
  }
}

export const listAssessments = async ({ page = 1, limit = 10 }) => {
  const response = await fetch(`${API_URL}/api/riskapi/assessments?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  // Return data in format expected by component
  return data.items || []
}