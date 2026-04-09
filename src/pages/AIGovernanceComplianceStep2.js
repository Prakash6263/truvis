"use client"

import { useState, useRef } from "react"
import GovernanceSidebar from "../components/GovernanceSidebar"
import TopBar from "../components/TopBar"
import { Link, useNavigate } from "react-router-dom"
import { uploadGovernanceDocuments } from "../api/governance"

const AIGovernanceComplianceStep2 = () => {
  const [formData, setFormData] = useState({
    aiModelArchitecture: "",
    keyRisks: "",
    additionalFreeText: "",
  })
  const [files, setFiles] = useState({
    sop: null,
    systemBrd: null,
    lastAuditReport: null,
    extraDocument: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const sopInputRef = useRef(null)
  const systemBrdInputRef = useRef(null)
  const lastAuditReportInputRef = useRef(null)
  const extraDocumentInputRef = useRef(null)
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
    if (!formData.aiModelArchitecture.trim()) {
      setError("Please describe AI model architecture")
      return
    }
    if (!formData.keyRisks.trim()) {
      setError("Please describe key risks")
      return
    }
    if (!files.sop && !files.systemBrd) {
      setError("Please upload at least one document (SOP or System BRD)")
      return
    }

    setLoading(true)
    try {
      const checkId = localStorage.getItem("governanceCheckId")
      if (!checkId) {
        setError("Check ID not found. Please start from step 1.")
        return
      }

      const formDataPayload = new FormData()
      formDataPayload.append("ai_model_architecture", formData.aiModelArchitecture)
      formDataPayload.append("key_risks", formData.keyRisks)
      
      // Append files
      if (files.sop) {
        formDataPayload.append("sop", files.sop, files.sop.name)
      }
      if (files.systemBrd) {
        formDataPayload.append("system_brd", files.systemBrd, files.systemBrd.name)
      }
      if (files.lastAuditReport) {
        formDataPayload.append("last_audit_report", files.lastAuditReport, files.lastAuditReport.name)
      }
      
      formDataPayload.append("additional_free_text", formData.additionalFreeText || "")
      
      if (files.extraDocument) {
        formDataPayload.append("extra_document", files.extraDocument, files.extraDocument.name)
      }

      console.log("[v0] Uploading AI governance documents for check ID:", checkId)
      const response = await uploadGovernanceDocuments(checkId, formDataPayload)
      console.log("[v0] AI governance documents uploaded:", response)

      // Store the upload response data for next step
      localStorage.setItem("governanceUploadResponse", JSON.stringify(response))

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
        <GovernanceSidebar />

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
                    {/* AI Model Architecture */}
                    <div className="mb-4">
                      <label className="form-label required">AI Model Architecture</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={formData.aiModelArchitecture}
                        onChange={(e) => handleInputChange("aiModelArchitecture", e.target.value)}
                        placeholder="E.g., Transformer chatbot with RAG, LLM-based system, etc."
                      ></textarea>
                    </div>

                    {/* Key Risks */}
                    <div className="mb-4">
                      <label className="form-label required">Key Risks</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={formData.keyRisks}
                        onChange={(e) => handleInputChange("keyRisks", e.target.value)}
                        placeholder="E.g., bias, hallucination, data leakage, etc."
                      ></textarea>
                    </div>

                    {/* SOP Upload */}
                    <div className="mb-4">
                      <label className="form-label">Upload SOP (Standard Operating Procedure)</label>
                      <div 
                        className="upload-box"
                        onClick={() => sopInputRef.current?.click()}
                        style={{ cursor: "pointer" }}
                      >
                        {files.sop ? (
                          <span style={{ color: "#2ed2c9", fontWeight: "bold" }}>✓ {files.sop.name}</span>
                        ) : (
                          "Drag & drop or click to upload (Max 1MB, PDF)"
                        )}
                      </div>
                      <input
                        ref={sopInputRef}
                        type="file"
                        className="form-control"
                        style={{ display: "none" }}
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange("sop", e.target.files?.[0])}
                      />
                      <div className="hint-text">e.g., sop.pdf</div>
                    </div>

                    {/* System BRD Upload */}
                    <div className="mb-4">
                      <label className="form-label">Upload System BRD (Business Requirements Document)</label>
                      <div 
                        className="upload-box"
                        onClick={() => systemBrdInputRef.current?.click()}
                        style={{ cursor: "pointer" }}
                      >
                        {files.systemBrd ? (
                          <span style={{ color: "#2ed2c9", fontWeight: "bold" }}>✓ {files.systemBrd.name}</span>
                        ) : (
                          "Drag & drop or click to upload (Max 1MB, PDF)"
                        )}
                      </div>
                      <input
                        ref={systemBrdInputRef}
                        type="file"
                        className="form-control"
                        style={{ display: "none" }}
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange("systemBrd", e.target.files?.[0])}
                      />
                      <div className="hint-text">e.g., brd.pdf</div>
                    </div>

                    {/* Last Audit Report Upload */}
                    <div className="mb-4">
                      <label className="form-label">Upload Last Audit Report</label>
                      <div 
                        className="upload-box"
                        onClick={() => lastAuditReportInputRef.current?.click()}
                        style={{ cursor: "pointer" }}
                      >
                        {files.lastAuditReport ? (
                          <span style={{ color: "#2ed2c9", fontWeight: "bold" }}>✓ {files.lastAuditReport.name}</span>
                        ) : (
                          "Drag & drop or click to upload (Max 1MB, PDF)"
                        )}
                      </div>
                      <input
                        ref={lastAuditReportInputRef}
                        type="file"
                        className="form-control"
                        style={{ display: "none" }}
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange("lastAuditReport", e.target.files?.[0])}
                      />
                      <div className="hint-text">e.g., audit_report.pdf (Optional)</div>
                    </div>

                    {/* Additional Free Text */}
                    <div className="mb-4">
                      <label className="form-label">Additional Information</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={formData.additionalFreeText}
                        onChange={(e) => handleInputChange("additionalFreeText", e.target.value)}
                        placeholder="Any additional information or notes..."
                      ></textarea>
                    </div>

                    {/* Extra Document Upload */}
                    <div className="mb-4">
                      <label className="form-label">Extra Document</label>
                      <div 
                        className="upload-box"
                        onClick={() => extraDocumentInputRef.current?.click()}
                        style={{ cursor: "pointer" }}
                      >
                        {files.extraDocument ? (
                          <span style={{ color: "#2ed2c9", fontWeight: "bold" }}>✓ {files.extraDocument.name}</span>
                        ) : (
                          "Drag & drop or click to upload (Max 1MB, PDF)"
                        )}
                      </div>
                      <input
                        ref={extraDocumentInputRef}
                        type="file"
                        className="form-control"
                        style={{ display: "none" }}
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange("extraDocument", e.target.files?.[0])}
                      />
                      <div className="hint-text">e.g., additional_doc.pdf (Optional)</div>
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
