import axios from "axios"

const AUDIT_API_URL = "https://python.aitechnotech.in/truvis/audit"

// Get token from localStorage
const getAuthToken = () => localStorage.getItem("token")

// STEP 1: Create audit scope
// POST https://python.aitechnotech.in/truvis/audit/scope
// Content-Type: application/x-www-form-urlencoded
export const createAuditScope = async (auditData) => {
  try {
    console.log("[v0] STEP 1: Creating audit scope with data:", auditData)

    const formData = new URLSearchParams()
    formData.append("audit_type", auditData.audit_type)
    formData.append("scope_description", auditData.scope_description)
    formData.append("department", auditData.department)
    formData.append("start_date", auditData.start_date)
    formData.append("end_date", auditData.end_date)
    formData.append("standards", auditData.standards)
    formData.append("notes", auditData.notes)

    const response = await axios.post(`${AUDIT_API_URL}/scope`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    console.log("[v0] STEP 1 SUCCESS - Response:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 1 FAILED - Error:", error.response?.data || error.message)
    throw error
  }
}

// STEP 2: Upload documents
// POST https://python.aitechnotech.in/truvis/audit/upload/{audit_id}
// Content-Type: multipart/form-data
export const uploadAuditDocuments = async (auditId, formDataPayload) => {
  try {
    console.log("[v0] STEP 2: Uploading documents for audit ID:", auditId)

    const response = await axios.post(`${AUDIT_API_URL}/upload/${auditId}`, formDataPayload, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    console.log("[v0] STEP 2 SUCCESS - Response:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 2 FAILED - Error:", error.response?.data || error.message)
    throw error
  }
}

// STEP 3.1: Run audit reasoning
// POST https://python.aitechnotech.in/truvis/audit/reason/{audit_id}
// Body: empty
export const runAuditReasoning = async (auditId) => {
  try {
    console.log("[v0] STEP 3.1: Starting audit reasoning for ID:", auditId)

    const response = await axios.post(`${AUDIT_API_URL}/reason/${auditId}`, "", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    console.log("[v0] STEP 3.1 SUCCESS - Response:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 3.1 FAILED - Error:", error.response?.data || error.message)
    throw error
  }
}

// STEP 3.2: Poll audit status
// GET https://python.aitechnotech.in/truvis/audit/status/{audit_id}
export const getAuditStatus = async (auditId) => {
  try {
    const response = await axios.get(`${AUDIT_API_URL}/status/${auditId}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    console.log("[v0] STEP 3.2: Status = ", response.data?.status)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 3.2 FAILED - Error:", error.response?.data || error.message)
    throw error
  }
}

// STEP 4: Finalize audit
// POST https://python.aitechnotech.in/truvis/audit/finalize/{audit_id}
// Body: empty
export const finalizeAudit = async (auditId) => {
  try {
    console.log("[v0] STEP 4: Finalizing audit ID:", auditId)

    const response = await axios.post(`${AUDIT_API_URL}/finalize/${auditId}`, "", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    console.log("[v0] STEP 4 SUCCESS - Response:", response.data)
    return response.data
  } catch (error) {
    console.error("[v0] STEP 4 FAILED - Error:", error.response?.data || error.message)
    throw error
  }
}
