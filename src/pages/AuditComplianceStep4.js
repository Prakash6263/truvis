"use client"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import { Link, useNavigate } from "react-router-dom"

const AuditComplianceStep4 = () => {
  const navigate = useNavigate()

  const handleNewAudit = () => {
    navigate("/audit-compliance")
  }

  const handleBack = () => {
    navigate("/audit-compliance-step3")
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

        .completion-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          border-radius: 15px;
          text-align: center;
          margin: 20px 0;
        }

        .completion-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .summary-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
        }

        .metric-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .metric-item:last-child {
          border-bottom: none;
        }

        .metric-value {
          font-weight: bold;
          color: #2ed2c9;
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
                <Link to="/audit-compliance-step3" className="btn btn-outline-secondary btn-nav">
                  ← Back
                </Link>
                <div>
                  <div className="step-header">Step 4 of 4: Final Report</div>
                  <div className="progress-indicator">
                    <div className="progress-bar-custom">
                      <div className="progress-bar-fill" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="btn btn-outline-secondary btn-nav" style={{ visibility: "hidden" }}>
                  Next →
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              {/* Completion Card */}
              <div className="completion-card">
                <div className="completion-icon">✅</div>
                <h3>Audit Compliance Assessment Complete!</h3>
                <p>
                  Your comprehensive audit has been successfully completed. Review the summary below for key findings
                  and recommendations.
                </p>
              </div>

              {/* Summary Card */}
              <div className="summary-card">
                <h5 className="text-dark mb-4">Audit Summary</h5>

                <div className="metric-item">
                  <span>Total Findings:</span>
                  <span className="metric-value">12</span>
                </div>

                <div className="metric-item">
                  <span>High Priority Issues:</span>
                  <span className="metric-value">3</span>
                </div>

                <div className="metric-item">
                  <span>Medium Priority Issues:</span>
                  <span className="metric-value">5</span>
                </div>

                <div className="metric-item">
                  <span>Low Priority Issues:</span>
                  <span className="metric-value">4</span>
                </div>

                <div className="metric-item">
                  <span>Compliance Score:</span>
                  <span className="metric-value">78%</span>
                </div>

                <div className="metric-item">
                  <span>Standards Evaluated:</span>
                  <span className="metric-value">ISO 27001, GDPR</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-center mt-5">
                <button className="btn btn-success me-3">
                  <i className="fa fa-download me-2"></i>
                  Download Full Report
                </button>
                <button className="btn btn-outline-primary me-3">
                  <i className="fa fa-share me-2"></i>
                  Share Results
                </button>
                <button className="btn-submit" onClick={handleNewAudit}>
                  Start New Audit
                </button>
              </div>

              {/* Next Steps */}
              <div className="summary-card mt-4">
                <h6 className="text-dark">Recommended Next Steps:</h6>
                <ul className="text-dark">
                  <li>Address high-priority findings within 30 days</li>
                  <li>Implement multi-factor authentication across all systems</li>
                  <li>Update data retention policies to ensure GDPR compliance</li>
                  <li>Schedule follow-up audit in 6 months</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AuditComplianceStep4
