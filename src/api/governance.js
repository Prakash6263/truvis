import axios from "axios"

const GOVERNANCE_API_URL = "https://python.aitechnotech.in/truvis/governance"

// Get token from localStorage
const getAuthToken = () => localStorage.getItem("token")

// STEP 1: Create governance scope
// POST https://python.aitechnotech.in/truvis/governance/scope
// Content-Type: application/x-www-form-urlencoded
export const createGovernanceScope = async (governanceData) => {
  try {
    console.log("[v0] STEP 1: Creating AI governance scope with data:", governanceData)

    const formData = new URLSearchParams()
    formData.append("compliance_scope", governanceData.compliance_scope)
    formData.append("custom_scope_description", governanceData.custom_scope_description)
    formData.append("department", governanceData.department)
    formData.append("start_date", governanceData.start_date)
    formData.append("end_date", governanceData.end_date)
    formData.append("standards", governanceData.standards)
    formData.append("additional_scope_details", governanceData.additional_scope_details)

    const response = await axios.post(`${GOVERNANCE_API_URL}/scope`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    console.log("[v0] STEP 1 SUCCESS - Governance scope created:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 1 FAILED - Error creating governance scope:", error.response?.data || error.message)
    throw error
  }
}

// STEP 2: Upload governance documents
// POST https://python.aitechnotech.in/truvis/governance/upload/{check_id}
// Content-Type: multipart/form-data
export const uploadGovernanceDocuments = async (checkId, formDataPayload) => {
  try {
    console.log("[v0] STEP 2: Uploading governance documents for check ID:", checkId)

    const response = await axios.post(`${GOVERNANCE_API_URL}/upload/${checkId}`, formDataPayload, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
        // Don't set Content-Type here, let axios set it with the boundary
      },
    })

    console.log("[v0] STEP 2 SUCCESS - Documents uploaded:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 2 FAILED - Error uploading documents:", error.response?.data || error.message)
    throw error
  }
}

// STEP 3: Run compliance reasoning
// POST https://python.aitechnotech.in/truvis/governance/reason/{check_id}
// Content: empty body
export const runComplianceReasoning = async (checkId) => {
  try {
    console.log("[v0] STEP 3: Running compliance reasoning for check ID:", checkId)

    const response = await axios.post(`${GOVERNANCE_API_URL}/reason/${checkId}`, {}, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    console.log("[v0] STEP 3 SUCCESS - Compliance reasoning results:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 3 FAILED - Error running compliance reasoning:", error.response?.data || error.message)
    throw error
  }
}

// STEP 4: Get governance check results
// GET https://python.aitechnotech.in/truvis/governance/check/{check_id}
export const getGovernanceCheck = async (checkId) => {
  try {
    console.log("[v0] STEP 4A: Fetching governance check results for check ID:", checkId)

    const response = await axios.get(`${GOVERNANCE_API_URL}/check/${checkId}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    console.log("[v0] STEP 4A SUCCESS - Governance check results retrieved:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 4A FAILED - Error fetching governance check:", error.response?.data || error.message)
    throw error
  }
}

// STEP 4: Submit governance results
// POST https://python.aitechnotech.in/truvis/governance/results/{check_id}
// Content: empty body
export const submitGovernanceResults = async (checkId) => {
  try {
    console.log("[v0] STEP 4B: Submitting governance results for check ID:", checkId)

    const response = await axios.post(`${GOVERNANCE_API_URL}/results/${checkId}`, {}, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    console.log("[v0] STEP 4B SUCCESS - Governance results submitted:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 4B FAILED - Error submitting governance results:", error.response?.data || error.message)
    throw error
  }
}

// STEP 4: Download governance report
// GET https://python.aitechnotech.in/truvis/governance/download/{check_id}
export const downloadGovernanceReport = async (checkId) => {
  try {
    console.log("[v0] STEP 4C: Downloading governance report for check ID:", checkId)

    const response = await axios.get(`${GOVERNANCE_API_URL}/download/${checkId}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      responseType: "blob",
    })

    console.log("[v0] STEP 4C SUCCESS - Governance report downloaded")
    return response.data
  } catch (error) {
    console.error("[v0] STEP 4C FAILED - Error downloading governance report:", error.response?.data || error.message)
    throw error
  }
}

// STEP 4: Governance Chat
// POST https://python.aitechnotech.in/truvis/governance/chat/{check_id}
// Content-Type: application/json
export const sendGovernanceChat = async (checkId, userMessage) => {
  try {
    console.log("[v0] STEP 4 CHAT: Sending message to governance chat for check ID:", checkId)

    const response = await axios.post(
      `${GOVERNANCE_API_URL}/chat/${checkId}`,
      {
        user_message: userMessage,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    )

    console.log("[v0] STEP 4 CHAT SUCCESS - Reply received:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 4 CHAT FAILED - Error sending governance chat:", error.response?.data || error.message)
    throw error
  }
}

// Get past governance reports
// GET https://python.aitechnotech.in/truvis/governance/past
export const getPastGovernanceReports = async () => {
  try {
    console.log("[v0] Fetching past governance reports")

    const response = await axios.get(`${GOVERNANCE_API_URL}/past`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    console.log("[v0] Past governance reports retrieved:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] Error fetching past governance reports:", error.response?.data || error.message)
    throw error
  }
}
