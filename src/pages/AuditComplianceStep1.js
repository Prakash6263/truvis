"use client"

import { useState } from "react"
import AuditHistorySidebar from "../components/AuditHistorySidebar"
import TopBar from "../components/TopBar"
import { Link, useNavigate } from "react-router-dom"
import { createAuditScope } from "../api/audit"

const AuditComplianceStep1 = () => {
  const [formData, setFormData] = useState({
    auditType: "",
    scopeDescription: "",
    department: "",
    startDate: "",
    endDate: "",
    standards: [],
    note: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError("")
  }

  const handleStandardChange = (standard) => {
    setFormData((prev) => ({
      ...prev,
      standards: prev.standards.includes(standard)
        ? prev.standards.filter((s) => s !== standard)
        : [...prev.standards, standard],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.auditType || !formData.scopeDescription || !formData.department || !formData.startDate || !formData.endDate) {
      setError("Please fill in all required fields")
      return
    }
    
    if (formData.standards.length === 0) {
      setError("Please select at least one standard")
      return
    }

    setLoading(true)
    try {
      const auditTypeMap = {
        internal: "Internal Security Audit",
        external: "External Audit",
        compliance: "Compliance Audit",
      }

      const payload = {
        audit_type: auditTypeMap[formData.auditType] || formData.auditType,
        scope_description: formData.scopeDescription,
        department: formData.department === "it" ? "IT Security" : formData.department,
        start_date: formData.startDate,
        end_date: formData.endDate,
        standards: formData.standards.join(","),
        notes: formData.note,
      }

      console.log("[v0] Submitting audit scope:", payload)
      const response = await createAuditScope(payload)
      console.log("[v0] Audit scope created:", response)

      // Store audit ID for next step
      localStorage.setItem("auditId", response.audit_id)
      navigate("/audit-compliance-step2")
    } catch (err) {
      console.error("[v0] Error creating audit:", err)
      setError(err.response?.data?.detail || "Failed to create audit scope. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate("/audit-compliance")
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

        .form-card a {
          font-size: 12px;
          text-decoration: none;
          color: #2ed2c9;
        }

        .form-card a:hover {
          text-decoration: underline;
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
                <Link to="/audit-compliance" className="btn btn-outline-secondary btn-nav">
                  ← Back
                </Link>
                <div>
                  <div className="step-header">Step 1 of 4: Define Scope</div>
                  <div className="progress-indicator">
                    <div className="progress-bar-custom">
                      <div className="progress-bar-fill" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>
                <Link className="btn btn-outline-secondary btn-nav" to="/audit-compliance-step2">
                  Next →
                </Link>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              <h6 className="text-dark">Define Audit Scope</h6>
              <p className="text-dark mb-5" style={{ fontSize: "13px" }}>
                Please Provide Details
              </p>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError("")}></button>
                </div>
              )}

              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <form onSubmit={handleSubmit}>
                    {/* Audit Type */}
                    <div className="mb-3">
                      <label className="form-label">Audit Type</label>
                      <select
                        className="form-select"
                        value={formData.auditType}
                        onChange={(e) => handleInputChange("auditType", e.target.value)}
                      >
                        <option value="">Audit Type</option>
                        <option value="internal">Internal Audit</option>
                        <option value="external">External Audit</option>
                        <option value="compliance">Compliance Audit</option>
                      </select>
                    </div>

                    {/* Scope Description */}
                    <div className="mb-3">
                      <label className="form-label">Scope Description</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Scope Description"
                        value={formData.scopeDescription}
                        onChange={(e) => handleInputChange("scopeDescription", e.target.value)}
                      ></textarea>
                    </div>

                    {/* Department */}
                    <div className="mb-3">
                      <label className="form-label">Department Involved</label>
                      <select
                        className="form-select"
                        value={formData.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                      >
                        <option value="">Department</option>
                        <option value="it">IT Department</option>
                        <option value="hr">HR Department</option>
                        <option value="finance">Finance Department</option>
                      </select>
                    </div>

                    {/* Date Range */}
                    <div className="mb-3">
                      <label className="form-label">Date Range</label>
                      <div className="row g-2">
                        <div className="col">
                          <input
                            type="date"
                            className="form-control"
                            value={formData.startDate}
                            onChange={(e) => handleInputChange("startDate", e.target.value)}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="date"
                            className="form-control"
                            value={formData.endDate}
                            onChange={(e) => handleInputChange("endDate", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Standard Selection */}
                    <div className="mb-3">
                      <label className="form-label">Standard Selection</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="iso"
                          checked={formData.standards.includes("ISO 27001")}
                          onChange={() => handleStandardChange("ISO 27001")}
                        />
                        <label className="form-check-label" htmlFor="iso">
                          ISO 27001
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gdpr"
                          checked={formData.standards.includes("GDPR")}
                          onChange={() => handleStandardChange("GDPR")}
                        />
                        <label className="form-check-label" htmlFor="gdpr">
                          GDPR
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="sox"
                          checked={formData.standards.includes("SOX")}
                          onChange={() => handleStandardChange("SOX")}
                        />
                        <label className="form-check-label" htmlFor="sox">
                          SOX
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="hipaa"
                          checked={formData.standards.includes("HIPAA")}
                          onChange={() => handleStandardChange("HIPAA")}
                        />
                        <label className="form-check-label" htmlFor="hipaa">
                          HIPAA
                        </label>
                      </div>
                      <a href="#">Detailed Analysis / Audit</a>
                    </div>

                    {/* Note */}
                    <div className="mb-3">
                      <label className="form-label">Note</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Note"
                        value={formData.note}
                        onChange={(e) => handleInputChange("note", e.target.value)}
                      ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="text-center">
                      <button type="button" className="btn-cancel" onClick={handleCancel} disabled={loading}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? "Creating Audit..." : "Submit"}
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

export default AuditComplianceStep1
