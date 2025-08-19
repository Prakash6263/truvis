"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import { Link, useNavigate } from "react-router-dom"

const AuditComplianceStep3 = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/audit-compliance-step4")
  }

  const handleBack = () => {
    navigate("/audit-compliance-step2")
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

        .badge-high { 
          background-color: #ff4d4d; 
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
        }
        
        .badge-low { 
          background-color: #28a745; 
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
        }
        
        .badge-mid { 
          background-color: #ffc107; 
          color: #333;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .table thead th {
          background: #fff;
          font-weight: 600;
        }

        .accordion-button:not(.collapsed) {
          background-color: #f1fdf6;
          color: #000;
        }

        .search-box {
          border: 1px solid #ddd;
          padding: 6px 12px;
          border-radius: 6px;
          width: 100%;
        }

        .table td, .table th {
          vertical-align: middle;
        }

        .bg-success-subtle {
          background-color: #DCFCE7 !important;
          margin: 10px;
        }

        .accordion-button:not(.collapsed) {
          background-color: #ffffff;
          color: #000;
          font-weight: bold;
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
                <Link to="/audit-compliance-step2" className="btn btn-outline-secondary btn-nav">
                  ← Back
                </Link>
                <div>
                  <div className="step-header">Step 3 of 4: Analysis Results</div>
                  <div className="progress-indicator">
                    <div className="progress-bar-custom">
                      <div className="progress-bar-fill" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
                <Link className="btn btn-outline-secondary btn-nav" to="/audit-compliance-step4">
                  Next →
                </Link>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                  <h6 className="mb-0 fw-bold text-dark">Audit Scope</h6>
                  <small className="text-dark">Audit Reasoning Overview</small>
                </div>
                <button className="btn btn-success btn-sm">
                  <i className="fa fa-download me-1"></i> Download
                </button>
              </div>

              <div className="text-center text-dark mb-5">
                <p>
                  The audit analysis has identified several compliance areas that require attention. The findings below
                  represent potential risks and recommendations for your organization's security posture.
                </p>
                <p>
                  Each finding has been categorized by severity level to help prioritize remediation efforts. Please
                  review the detailed recommendations for each identified issue.
                </p>
              </div>

              {/* Detail Finding Table */}
              <div className="table-responsive bg-white p-2 rounded">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>Finding</th>
                      <th>Severity</th>
                      <th>Recommendation</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>RC001</td>
                      <td>
                        <span className="badge-high">High</span>
                      </td>
                      <td>
                        None Identified <i className="fa fa-arrow-up"></i>
                      </td>
                      <td>
                        System scan report <i className="fa fa-arrow-up"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>RC002</td>
                      <td>
                        <span className="badge-low">Low</span>
                      </td>
                      <td>
                        Enforce MFA <i className="fa fa-arrow-up"></i>
                      </td>
                      <td>
                        System scan report <i className="fa fa-arrow-up"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-light p-2 rounded mt-3">
                <div className="shadow rounded p-2 bg-white">
                  {/* Search */}
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Search reasoning steps or findings..."
                      className="search-box"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Accordion */}
                  <div className="accordion mt-3" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#step1"
                        >
                          Step 1: Compliance with ISO 27001
                        </button>
                      </h2>
                      <div id="step1" className="accordion-collapse collapse show">
                        <div className="accordion-body bg-success-subtle">
                          Confidence: High - All ISO 27001 requirements have been evaluated against current practices.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#step2"
                        >
                          Step 2: Identify Risk
                        </button>
                      </h2>
                      <div id="step2" className="accordion-collapse collapse">
                        <div className="accordion-body">
                          Risk assessment completed with focus on data protection and access controls.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#step3"
                        >
                          Step 3: Recommendation
                        </button>
                      </h2>
                      <div id="step3" className="accordion-collapse collapse">
                        <div className="accordion-body">
                          Detailed recommendations provided for each identified compliance gap.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer buttons */}
                  <div className="d-flex mt-3">
                    <button className="btn btn-outline-secondary me-3" onClick={handleBack}>
                      Back
                    </button>
                    <button className="btn-submit" onClick={handleSubmit}>
                      Proceed to Next Step
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AuditComplianceStep3
