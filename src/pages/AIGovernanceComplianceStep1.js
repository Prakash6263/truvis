"use client"

import { useState } from "react"
import GovernanceSidebar from "../components/GovernanceSidebar"
import TopBar from "../components/TopBar"
import { Link, useNavigate } from "react-router-dom"
import { createGovernanceScope } from "../api/governance"

const AIGovernanceComplianceStep1 = () => {
  const [formData, setFormData] = useState({
    complianceScope: "Full AI System",
    customScopeDescription: "",
    department: "",
    startDate: "",
    endDate: "",
    standards: [],
    additionalDetails: "",
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
    if (!formData.customScopeDescription || !formData.department || !formData.startDate || !formData.endDate) {
      setError("Please fill in all required fields")
      return
    }
    
    if (formData.standards.length === 0) {
      setError("Please select at least one standard")
      return
    }

    setLoading(true)
    try {
      // Format start and end dates to MM/DD/YYYY format as per API requirements
      const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
      }

      const payload = {
        compliance_scope: formData.complianceScope,
        custom_scope_description: formData.customScopeDescription,
        department: formData.department,
        start_date: formatDate(formData.startDate),
        end_date: formatDate(formData.endDate),
        standards: formData.standards.join(","),
        additional_scope_details: formData.additionalDetails,
      }

      console.log("[v0] Submitting AI governance scope:", payload)
      const response = await createGovernanceScope(payload)
      console.log("[v0] AI governance scope created:", response)

      // Store check_id for next step
      localStorage.setItem("governanceCheckId", response.check_id)
      localStorage.setItem("governanceScope", JSON.stringify(response))
      navigate("/ai-governance-compliance-step2")
    } catch (err) {
      console.error("[v0] Error creating AI governance scope:", err)
      setError(err.response?.data?.detail || "Failed to create AI governance scope. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate("/dashboard")
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
        <GovernanceSidebar />

        <div className="main2">
          <TopBar />

          <div className="middle">
            {/* Step Header */}
            <div className="container text-center">
              <div className="d-flex justify-content-between align-items-center mt-5">
                <Link to="/dashboard" className="btn btn-outline-secondary btn-nav">
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
                <Link className="btn btn-outline-secondary btn-nav" to="/ai-governance-compliance-step2">
                  Next →
                </Link>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              <h6 className="text-dark">Define AI Governance Audit Scope</h6>
              <p className="text-dark mb-5" style={{ fontSize: "13px" }}>
                Please Provide Details for Your AI Governance Compliance Assessment
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
                    {/* Compliance Scope */}
                    <div className="mb-3">
                      <label className="form-label">Compliance Scope</label>
                      <select
                        className="form-select"
                        value={formData.complianceScope}
                        onChange={(e) => handleInputChange("complianceScope", e.target.value)}
                      >
                        <option value="Full AI System">Full AI System</option>
                        <option value="Specific AI Components">Specific AI Components</option>
                        <option value="Data Processing">Data Processing</option>
                        <option value="Model Training">Model Training</option>
                        <option value="Deployment">Deployment</option>
                      </select>
                    </div>

                    {/* Custom Scope Description */}
                    <div className="mb-3">
                      <label className="form-label">Custom Scope Description</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Provide detailed description of your scope..."
                        value={formData.customScopeDescription}
                        onChange={(e) => handleInputChange("customScopeDescription", e.target.value)}
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
                        <option value="">Select Department</option>
                        <option value="it">IT Department</option>
                        <option value="ai">AI/ML Department</option>
                        <option value="compliance">Compliance Department</option>
                        <option value="ethics">Ethics & Governance</option>
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
                      <label className="form-label">Governance Standards</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="aiAct"
                          checked={formData.standards.includes("AI Act")}
                          onChange={() => handleStandardChange("AI Act")}
                        />
                        <label className="form-check-label" htmlFor="aiAct">
                          EU AI Act
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="iso42001"
                          checked={formData.standards.includes("ISO 42001")}
                          onChange={() => handleStandardChange("ISO 42001")}
                        />
                        <label className="form-check-label" htmlFor="iso42001">
                          ISO 42001 (AI Management System)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="nist"
                          checked={formData.standards.includes("NIST AI RMF")}
                          onChange={() => handleStandardChange("NIST AI RMF")}
                        />
                        <label className="form-check-label" htmlFor="nist">
                          NIST AI Risk Management Framework
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
                          GDPR (Data Privacy)
                        </label>
                      </div>
                      <a href="#">Detailed Analysis / Audit</a>
                    </div>

                    {/* Additional Scope Details */}
                    <div className="mb-3">
                      <label className="form-label">Additional Scope Details</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="E.g., ai_model_architecture = Transformer chatbot with RAG, key_risks = bias, hallucination, data leakage..."
                        value={formData.additionalDetails}
                        onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
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

export default AIGovernanceComplianceStep1
