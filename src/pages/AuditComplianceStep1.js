"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import { Link, useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleStandardChange = (standard) => {
    setFormData((prev) => ({
      ...prev,
      standards: prev.standards.includes(standard)
        ? prev.standards.filter((s) => s !== standard)
        : [...prev.standards, standard],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    navigate("/audit-compliance-step2")
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
        <Sidebar />

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
                      <button type="button" className="btn-cancel" onClick={handleCancel}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-submit">
                        Submit
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
