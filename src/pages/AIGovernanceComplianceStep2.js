"use client"

import { useState, useRef } from "react"
import AuditHistorySidebar from "../components/AuditHistorySidebar"
import TopBar from "../components/TopBar"
import { Link, useNavigate } from "react-router-dom"
import { uploadAuditDocuments } from "../api/audit"

const AIGovernanceComplianceStep2 = () => {
  const [formData, setFormData] = useState({
    complianceDescription: "",
    additionalInfo: "",
  })
  const [files, setFiles] = useState({
    aiPolicy: null,
    riskAssessment: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const aiPolicyInputRef = useRef(null)
  const riskAssessmentInputRef = useRef(null)
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError("")
  }

  const handleFileChange = (field, file) => {
    if (file && file.size > 1024 * 1024) {
      setError(`File size must be less than 1MB. ${field} is too large.`)
      return
    }
    setFiles((prev) => ({
      ...prev,
      [field]: file,
    }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.complianceDescription.trim()) {
      setError("Please describe current AI governance practices")
      return
    }
    if (!files.aiPolicy) {
      setError("Please upload AI Policy/Framework")
      return
    }
    if (!files.riskAssessment) {
      setError("Please upload AI Risk Assessment")
      return
    }

    setLoading(true)
    try {
      const auditId = localStorage.getItem("aiGovernanceAuditId")
      if (!auditId) {
        setError("Audit ID not found. Please start from step 1.")
        return
      }

      const formDataPayload = new FormData()
      formDataPayload.append("compliance_description", formData.complianceDescription)
      formDataPayload.append("sop", files.aiPolicy, files.aiPolicy.name)
      formDataPayload.append("last_audit", files.riskAssessment, files.riskAssessment.name)
      formDataPayload.append("additional_info", formData.additionalInfo)

      console.log("[v0] Uploading AI governance documents for audit:", auditId)
      const response = await uploadAuditDocuments(auditId, formDataPayload)
      console.log("[v0] AI governance documents uploaded:", response)

      // Store the extracted preview for display in step 3
      if (response.extracted_preview) {
        localStorage.setItem("aiGovernanceExtractedPreview", response.extracted_preview)
      }

      navigate("/ai-governance-compliance-step3")
    } catch (err) {
      console.error("[v0] Error uploading documents:", err)
      setError(err.response?.data?.detail || "Failed to upload documents. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate("/ai-governance-compliance-step1")
  }

  return (
    <>
      <style>{`
        :root {
          --bg-light: #ffffff;
          --bg-dark: #121212;
          --text-light: #000;
          --text-dark: #fff;
          --accent: #3AC6BD;
          --sidebar-width: 300px;
          --card-bg: #f9f9f9;
          --border-color: #eee;
        }

        body {
          margin: 0;
          background-color: var(--bg-light);
          color: var(--text-light);
          transition: all 0.3s ease;
        }

        .form-card .btn-cancel {
          background: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 13px;
          padding: 8px 20px;
        }

        .form-card .btn-submit {
          background: #2ed2c9;
          color: white;
          border-radius: 6px;
          font-size: 13px;
          padding: 8px 20px;
          border: none;
        }

        .doc-section {
          background: #fcffff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .form-label {
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        textarea.form-control {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          font-size: 13px;
          min-height: 60px;
        }

        .upload-box {
          background: #fff;
          border: 1px dashed #d1d5db;
          padding: 15px;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
          border-radius: 6px;
          cursor: pointer;
        }

        .hint-text {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        .required::after {
          content: " *";
          color: red;
        }
      `}</style>

      <main className="main">
        <AuditHistorySidebar />

        <div className="main2">
          <TopBar />

          <div className="middle">
            {/* Step Header */}
            <div className="container text-center">
              <div className="d-flex justify-content-between align-items-center mt-5">
                <Link to="/ai-governance-compliance-step1" className="btn btn-outline-secondary btn-nav">
                  ← Back
                </Link>
                <div>
                  <div className="step-header">Step 2 of 4: Document Submission</div>
                  <div className="progress-indicator">
                    <div className="progress-bar-custom">
                      <div className="progress-bar-fill" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </div>
                <Link className="btn btn-outline-secondary btn-nav" to="/ai-governance-compliance-step3">
                  Next →
                </Link>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              <h6 className="text-dark">Upload AI Governance Documents</h6>
              <p className="text-dark mb-5" style={{ fontSize: "13px" }}>
                Based on your scope, provide the following documentation. All uploads require metadata descriptions.
              </p>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError("")}></button>
                </div>
              )}

              <div className="row justify-content-center">
                <div className="doc-section">
                  <div className="section-title">Required Documents</div>

                  <form onSubmit={handleSubmit}>
                    {/* Compliance Description */}
                    <div className="mb-4">
                      <label className="form-label required">Describe current AI governance practices</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={formData.complianceDescription}
                        onChange={(e) => handleInputChange("complianceDescription", e.target.value)}
                        placeholder="Describe your organization's current AI governance practices and frameworks..."
                      ></textarea>
                    </div>

                    {/* AI Policy Upload */}
                    <div className="mb-4">
                      <label className="form-label required">Upload AI Policy/Framework</label>
                      <div 
                        className="upload-box"
                        onClick={() => aiPolicyInputRef.current?.click()}
                        style={{ cursor: "pointer" }}
                      >
                        {files.aiPolicy ? (
                          <span style={{ color: "#2ed2c9", fontWeight: "bold" }}>✓ {files.aiPolicy.name}</span>
                        ) : (
                          "Drag & drop or click to upload (Max 1MB, PDF, DOCX, XLSX)"
                        )}
                      </div>
                      <input
                        ref={aiPolicyInputRef}
                        type="file"
                        className="form-control"
                        style={{ display: "none" }}
                        accept=".pdf,.docx,.xlsx,.doc,.xls"
                        onChange={(e) => handleFileChange("aiPolicy", e.target.files?.[0])}
                      />
                      <div className="hint-text">e.g., AI Policy Framework, AI Ethics Guidelines</div>
                    </div>

                    {/* Risk Assessment Upload */}
                    <div className="mb-4">
                      <label className="form-label required">Upload AI Risk Assessment</label>
                      <div 
                        className="upload-box"
                        onClick={() => riskAssessmentInputRef.current?.click()}
                        style={{ cursor: "pointer" }}
                      >
                        {files.riskAssessment ? (
                          <span style={{ color: "#2ed2c9", fontWeight: "bold" }}>✓ {files.riskAssessment.name}</span>
                        ) : (
                          "Drag & drop or click to upload (Max 1MB, PDF, DOCX, XLSX)"
                        )}
                      </div>
                      <input
                        ref={riskAssessmentInputRef}
                        type="file"
                        className="form-control"
                        style={{ display: "none" }}
                        accept=".pdf,.docx,.xlsx,.doc,.xls"
                        onChange={(e) => handleFileChange("riskAssessment", e.target.files?.[0])}
                      />
                      <div className="hint-text">e.g., AI Risk Assessment Report, Model Governance Documentation</div>
                    </div>

                    {/* Additional Information */}
                    <div className="mb-4">
                      <label className="form-label">Additional Information</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                        placeholder="Any additional information to help with the AI governance assessment..."
                      ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="text-center mt-5">
                      <button type="button" className="btn-cancel" onClick={handleCancel} disabled={loading}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? "Uploading..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AIGovernanceComplianceStep2
