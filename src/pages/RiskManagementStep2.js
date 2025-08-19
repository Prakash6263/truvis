"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import { Link, useNavigate } from "react-router-dom"

const RiskManagementStep2 = () => {
  const [formData, setFormData] = useState({
    dataEncryption: "",
    vendorAudit: "",
    mfaMigration: "",
  })
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    navigate("/risk-management-step3")
  }

  const handleCancel = () => {
    navigate("/risk-management-chat")
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
          font-family: 'Segoe UI', sans-serif;
          margin: 0;
          background-color: var(--bg-light);
          color: var(--text-light);
          transition: all 0.3s ease;
        }

        .log-time {
          font-size: 12px;
          color: #666;
          margin-top: 15px;
          margin-bottom: 5px;
        }

        .log-entry {
          background: #f8f9fa;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          line-height: 1.5;
        }

        .clarification-section {
          margin-top: 30px;
        }

        .question {
          font-weight: 500;
          margin: 20px 0 10px 0;
        }

        .icon-question {
          margin-right: 8px;
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
                <Link to="/risk-management-chat" className="btn btn-outline-secondary btn-nav">
                  ← Back
                </Link>
                <div>
                  <div className="step-header">Step 2 of 4: Define Clarification</div>
                  <div className="progress-indicator">
                    <div className="progress-bar-custom">
                      <div className="progress-bar-fill" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </div>
                <Link className="btn btn-outline-secondary btn-nav" to="/risk-management-step3">
                  Next →
                </Link>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              {/* System Overview */}
              <div className="section-title text-dark">🧠 Reasoning Log</div>
              <div className="subtext">This section provides a high-level summary of the system being assessed...</div>

              <div className="log-time text-dark">10:35 AM</div>
              <div className="log-entry">
                Initiated analysis of 'Customer Data Platform' based on provided documentation.
                <br />
                Identified potential data privacy risks due to PII handling.
                <br />
                Cross-referenced system architecture with industry best practices.
              </div>

              <div className="log-time text-dark">10:37 AM</div>
              <div className="log-entry">
                Detected absence of explicit data encryption policy for data at rest.
                <br />
                Flagged potential compliance gaps with GDPR Article 32.
              </div>

              <div className="log-time text-dark">10:38 AM</div>
              <div className="log-entry">
                Identified third-party API integration for payment processing.
                <br />
                Assessing vendor security posture based on available information.
              </div>

              <div className="log-time text-dark">10:41 AM</div>
              <div className="log-entry">
                Noted use of legacy authentication protocols in one module.
                <br />
                Recommending upgrade to modern, multi-factor authentication.
                <br />
                Completed initial scan. Generating clarification questions for ambiguous areas.
              </div>

              {/* Clarification Questions */}
              <div className="clarification-section">
                <div className="section-title text-dark">
                  <span className="icon-question">❓</span>
                  Clarification Questions
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="question text-dark">Is data at rest encrypted for all sensitive data stores?</div>
                  <select
                    className="form-select"
                    value={formData.dataEncryption}
                    onChange={(e) => handleInputChange("dataEncryption", e.target.value)}
                  >
                    <option value="" disabled>
                      Select An Option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="partially">Partially</option>
                  </select>

                  <div className="question text-dark">
                    What is the current status of the third-party vendor security audit for the payment processing API?
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Completed, In Progress, Not Started"
                      value={formData.vendorAudit}
                      onChange={(e) => handleInputChange("vendorAudit", e.target.value)}
                    />
                  </div>

                  <div className="question text-dark">
                    Are there plans to migrate from legacy authentication protocols to MFA within the next 6 months?
                  </div>
                  <select
                    className="form-select"
                    value={formData.mfaMigration}
                    onChange={(e) => handleInputChange("mfaMigration", e.target.value)}
                  >
                    <option value="" disabled>
                      Select An Option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="under-review">Under Review</option>
                  </select>

                  <div className="text-center mt-5">
                    <div>
                      <button type="button" className="btn btn-outline-secondary btn-nav me-2" onClick={handleCancel}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-success btn-nav">
                        Continue to Step 3
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default RiskManagementStep2
