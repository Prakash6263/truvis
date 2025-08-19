"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import { Link, useNavigate } from "react-router-dom"

const AuditComplianceStep2 = () => {
  const [formData, setFormData] = useState({
    complianceProcesses: "",
    additionalInfo: "",
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
    navigate("/audit-compliance-step3")
  }

  const handleCancel = () => {
    navigate("/audit-compliance-step1")
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
        <Sidebar />

        <div className="main2">
          <TopBar />

          <div className="middle">
            {/* Step Header */}
            <div className="container text-center">
              <div className="d-flex justify-content-between align-items-center mt-5">
                <Link to="/audit-compliance-step1" className="btn btn-outline-secondary btn-nav">
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
                <Link className="btn btn-outline-secondary btn-nav" to="/audit-compliance-step3">
                  Next →
                </Link>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              <h6 className="text-dark">Upload and Input Audit</h6>
              <p className="text-dark mb-5" style={{ fontSize: "13px" }}>
                Based on your scope, provide the following information. All uploads require metadata descriptions.
              </p>

              <div className="row justify-content-center">
                <div className="doc-section">
                  <div className="section-title">Required Documents</div>

                  <form onSubmit={handleSubmit}>
                    {/* Compliance Processes */}
                    <div className="mb-4">
                      <label className="form-label required">Describe current compliance processes</label>
                      <textarea
                        className="form-control"
                        value={formData.complianceProcesses}
                        onChange={(e) => handleInputChange("complianceProcesses", e.target.value)}
                      ></textarea>
                    </div>

                    {/* SOP Upload */}
                    <div className="mb-4">
                      <label className="form-label required">Upload Standard Operating Procedure (SOP)</label>
                      <div className="upload-box">Drag & drop or click to upload (Max 1MB, PDF, DOCX, XLSX)</div>
                      <div className="hint-text">e.g., Standard Operating Procedure for Data Handling, version 2.1</div>
                    </div>

                    {/* Last Audit Report Upload */}
                    <div className="mb-4">
                      <label className="form-label required">Upload Last Audit Report</label>
                      <div className="upload-box">Drag & drop or click to upload (Max 1MB, PDF, DOCX, XLSX)</div>
                      <div className="hint-text">e.g., Annual Security Audit Report for FY2023</div>
                    </div>

                    {/* Additional Information */}
                    <div className="mb-4">
                      <label className="form-label">Additional Information</label>
                      <textarea
                        className="form-control"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="text-center mt-5">
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

export default AuditComplianceStep2
