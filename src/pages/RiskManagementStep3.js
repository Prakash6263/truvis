// "use client"

// import { useState } from "react"
// import Sidebar from "../components/Sidebar"
// import TopBar from "../components/TopBar"
// import { Link, useNavigate } from "react-router-dom"

// const RiskManagementStep3 = () => {
//   const [selectedRisks, setSelectedRisks] = useState([])
//   const [aiInput, setAiInput] = useState("")
//   const [itemsPerPage, setItemsPerPage] = useState(10)
//   const navigate = useNavigate()

//   const riskData = [
//     {
//       id: "R0001",
//       title:
//         "If a malicious actor exploits a vulnerability in the web frontend, then unauthorized access to user data may occur, leading to a data",
//       impact: "Severe",
//       likelihood: "Likely",
//       riskLevel: "High",
//     },
//     {
//       id: "R0002",
//       title:
//         "If a malicious actor exploits a vulnerability in the web frontend, then unauthorized access to user data may occur, leading to a data",
//       impact: "Severe",
//       likelihood: "Likely",
//       riskLevel: "Low",
//     },
//     {
//       id: "R0003",
//       title:
//         "If a malicious actor exploits a vulnerability in the web frontend, then unauthorized access to user data may occur, leading to a data",
//       impact: "Severe",
//       likelihood: "Likely",
//       riskLevel: "Mid",
//     },
//   ]

//   const handleRiskSelect = (riskId) => {
//     setSelectedRisks((prev) => (prev.includes(riskId) ? prev.filter((id) => id !== riskId) : [...prev, riskId]))
//   }

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedRisks(riskData.map((risk) => risk.id))
//     } else {
//       setSelectedRisks([])
//     }
//   }

//   const handleAiSubmit = (e) => {
//     e.preventDefault()
//     console.log("AI Input:", aiInput)
//     navigate("/risk-management-final")
//   }

//   const handleCancel = () => {
//     navigate("/risk-management-step2")
//   }

//   const getRiskBadgeClass = (level) => {
//     switch (level.toLowerCase()) {
//       case "high":
//         return "badge-high"
//       case "low":
//         return "badge-low"
//       case "mid":
//         return "badge-med"
//       default:
//         return "badge-med"
//     }
//   }

//   return (
//     <>
//       <style>{`
//         :root {
//           --bg-light: #ffffff;
//           --bg-dark: #121212;
//           --text-light: #000;
//           --text-dark: #fff;
//           --accent: #3AC6BD;
//           --sidebar-width: 300px;
//           --card-bg: #f9f9f9;
//           --border-color: #eee;
//         }

//         body {
//           margin: 0;
//           background-color: var(--bg-light);
//           color: var(--text-light);
//           transition: all 0.3s ease;
//         }

//         .table th {
//           background: #fafafa;
//           font-weight: 600;
//         }

//         .badge-high {
//           background-color: #ff6b6b;
//           color: white;
//           padding: 5px 10px;
//           border-radius: 6px;
//         }

//         .badge-low {
//           background-color: #51cf66;
//           color: white;
//           padding: 5px 10px;
//           border-radius: 6px;
//         }

//         .badge-med {
//           background-color: #ffd43b;
//           color: #333;
//           padding: 5px 10px;
//           border-radius: 6px;
//         }

//         .download-btn {
//           float: right;
//           background-color: #2ed2c9;
//           color: white;
//           border-radius: 50px;
//           padding: 8px 18px;
//           border: none;
//         }

//         .ai-box {
//           border: 1px solid #e0e0e0;
//           border-radius: 12px;
//           padding: 10px;
//           display: flex;
//           align-items: center;
//           background-color: #fafafa;
//         }

//         .ai-box input {
//           border: none;
//           background: none;
//           flex: 1;
//           outline: none;
//         }

//         .ai-actions i {
//           font-size: 18px;
//           margin-left: 10px;
//           cursor: pointer;
//         }

//         .btn-submit {
//           background-color: #2ed2c9;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           padding: 8px 18px;
//         }

//         .btn-cancel {
//           background-color: #f1f1f1;
//           border: none;
//           border-radius: 6px;
//           padding: 8px 18px;
//           margin-right: 8px;
//         }
//       `}</style>

//       <main className="main">
//         <Sidebar />

//         <div className="main2">
//           <TopBar />

//           <div className="middle">
//             {/* Step Header */}
//             <div className="container text-center">
//               <div className="d-flex justify-content-between align-items-center mt-5">
//                 <Link to="/risk-management-step2" className="btn btn-outline-secondary btn-nav">
//                   ← Back
//                 </Link>
//                 <div>
//                   <div className="step-header">Step 3 of 4: Risk Assessment Result Validation</div>
//                   <div className="progress-indicator">
//                     <div className="progress-bar-custom">
//                       <div className="progress-bar-fill" style={{ width: "75%" }}></div>
//                     </div>
//                   </div>
//                 </div>
//                 <Link className="btn btn-outline-secondary btn-nav" to="/risk-management-final">
//                   Next →
//                 </Link>
//               </div>
//             </div>

//             {/* Form Card */}
//             <div className="form-card">
//               <div className="page-container">
//                 <div className="d-flex justify-content-between">
//                   <div>
//                     <h6>Risk Register</h6>
//                     <p className="text-muted">Please Provided Details</p>
//                   </div>
//                   <div>
//                     <button className="download-btn">
//                       <i className="fa fa-download me-1"></i> Download
//                     </button>
//                   </div>
//                 </div>

//                 <div className="table-responsive mt-4">
//                   <table className="table align-middle">
//                     <thead>
//                       <tr>
//                         <th>
//                           <input
//                             type="checkbox"
//                             onChange={handleSelectAll}
//                             checked={selectedRisks.length === riskData.length}
//                           />
//                         </th>
//                         <th>Risk ID</th>
//                         <th>Title</th>
//                         <th>Impact</th>
//                         <th>Likelihood</th>
//                         <th>Risk Level</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {riskData.map((risk) => (
//                         <tr key={risk.id}>
//                           <td>
//                             <input
//                               type="checkbox"
//                               checked={selectedRisks.includes(risk.id)}
//                               onChange={() => handleRiskSelect(risk.id)}
//                             />
//                           </td>
//                           <td>{risk.id}</td>
//                           <td>{risk.title}</td>
//                           <td>
//                             {risk.impact} <i className="fa fa-wrench ms-1"></i>
//                           </td>
//                           <td>{risk.likelihood}</td>
//                           <td>
//                             <span className={getRiskBadgeClass(risk.riskLevel)}>{risk.riskLevel}</span>
//                           </td>
//                           <td>
//                             <i className="fa fa-eye"></i>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="d-flex justify-content-between align-items-center mt-2 text-dark">
//                   <span>
//                     Items per page:
//                     <select
//                       className="form-select d-inline-block"
//                       style={{ width: "auto" }}
//                       value={itemsPerPage}
//                       onChange={(e) => setItemsPerPage(e.target.value)}
//                     >
//                       <option value="10">10</option>
//                       <option value="20">20</option>
//                       <option value="50">50</option>
//                     </select>
//                     1-10 of 200 items
//                   </span>
//                   <nav>
//                     <ul className="pagination pagination-sm mb-0 mt-0">
//                       <li className="page-item">
//                         <a className="page-link" href="#">
//                           ‹
//                         </a>
//                       </li>
//                       <li className="page-item">
//                         <a className="page-link" href="#">
//                           ›
//                         </a>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div>

//                 {/* AI Section */}
//                 <div className="mt-5">
//                   <h6>Risk Reassess</h6>
//                   <p className="text-muted">Please Provided Details</p>
//                   <form onSubmit={handleAiSubmit}>
//                     <div className="ai-box">
//                       <input
//                         type="text"
//                         placeholder="Type to ask our ai.."
//                         value={aiInput}
//                         onChange={(e) => setAiInput(e.target.value)}
//                       />
//                       <div className="ai-actions">
//                         <i className="fa fa-paperclip"></i>
//                         <button type="submit" style={{ border: "none", background: "none" }}>
//                           <i className="fa fa-paper-plane text-primary"></i>
//                         </button>
//                       </div>
//                     </div>
//                     <div className="mt-3 text-center">
//                       <button type="button" className="btn-cancel" onClick={handleCancel}>
//                         Cancel
//                       </button>
//                       <button type="submit" className="btn-submit">
//                         Complete Assessment
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }

// export default RiskManagementStep3




"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { listRisks, reassessRisks, completeAssessment, downloadAssessmentReport } from "../api/risk"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import { Link } from "react-router-dom"

const RiskManagementStep3 = () => {
  const navigate = useNavigate()
  const [selectedRisks, setSelectedRisks] = useState([])
  const [aiInput, setAiInput] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [risks, setRisks] = useState([])
  const [page, setPage] = useState(1)

  const handleCancel = () => {
    navigate("/risk-management-step2")
  }

  useEffect(() => {
    const id = localStorage.getItem("assessmentId")
    if (!id) return
    listRisks({ assessmentId: id, page, limit: itemsPerPage })
      .then((res) => setRisks(res?.data?.items || res?.data || res?.risks || []))
      .catch((e) => console.error("[v0] list risks error:", e.message))
  }, [page, itemsPerPage])

  const handleRiskSelect = (riskId) => {
    setSelectedRisks((prev) => (prev.includes(riskId) ? prev.filter((id) => id !== riskId) : [...prev, riskId]))
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRisks(risks.map((risk) => risk.id))
    } else {
      setSelectedRisks([])
    }
  }

  const handleAiSubmit = async (e) => {
    e.preventDefault()
    try {
      const id = localStorage.getItem("assessmentId")
      if (aiInput || selectedRisks.length) {
        await reassessRisks({ assessmentId: id, riskIds: selectedRisks, prompt: aiInput })
      }
      await completeAssessment(id)
      navigate("/risk-management-final")
    } catch (e) {
      alert(e.message || "Failed to complete assessment")
    }
  }

  const handleDownload = async () => {
    try {
      const id = localStorage.getItem("assessmentId")
      await downloadAssessmentReport(id)
    } catch (e) {
      alert(e.message || "Download failed")
    }
  }

  const getRiskBadgeClass = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "badge-high"
      case "low":
        return "badge-low"
      case "mid":
        return "badge-med"
      default:
        return "badge-med"
    }
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

        .table th {
          background: #fafafa;
          font-weight: 600;
        }

        .badge-high {
          background-color: #ff6b6b;
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .badge-low {
          background-color: #51cf66;
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .badge-med {
          background-color: #ffd43b;
          color: #333;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .download-btn {
          float: right;
          background-color: #2ed2c9;
          color: white;
          border-radius: 50px;
          padding: 8px 18px;
          border: none;
        }

        .ai-box {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 10px;
          display: flex;
          align-items: center;
          background-color: #fafafa;
        }

        .ai-box input {
          border: none;
          background: none;
          flex: 1;
          outline: none;
        }

        .ai-actions i {
          font-size: 18px;
          margin-left: 10px;
          cursor: pointer;
        }

        .btn-submit {
          background-color: #2ed2c9;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 18px;
        }

        .btn-cancel {
          background-color: #f1f1f1;
          border: none;
          border-radius: 6px;
          padding: 8px 18px;
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
                <Link to="/risk-management-step2" className="btn btn-outline-secondary btn-nav">
                  ← Back
                </Link>
                <div>
                  <div className="step-header">Step 3 of 4: Risk Assessment Result Validation</div>
                  <div className="progress-indicator">
                    <div className="progress-bar-custom">
                      <div className="progress-bar-fill" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
                <Link to="/risk-management-final" className="btn btn-outline-secondary btn-nav">
                  Next →
                </Link>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              <div className="page-container">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6>Risk Register</h6>
                    <p className="text-muted">Please Provided Details</p>
                  </div>
                  <div>
                    <button className="download-btn" onClick={handleDownload}>
                      <i className="fa fa-download me-1"></i> Download
                    </button>
                  </div>
                </div>

                <div className="table-responsive mt-4">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selectedRisks.length === risks.length}
                          />
                        </th>
                        <th>Risk ID</th>
                        <th>Title</th>
                        <th>Impact</th>
                        <th>Likelihood</th>
                        <th>Risk Level</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {risks.map((risk) => (
                        <tr key={risk.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedRisks.includes(risk.id)}
                              onChange={() => handleRiskSelect(risk.id)}
                            />
                          </td>
                          <td>{risk.id}</td>
                          <td>{risk.title}</td>
                          <td>
                            {risk.impact} <i className="fa fa-wrench ms-1"></i>
                          </td>
                          <td>{risk.likelihood}</td>
                          <td>
                            <span className={getRiskBadgeClass(risk.riskLevel)}>{risk.riskLevel}</span>
                          </td>
                          <td>
                            <i className="fa fa-eye"></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-2 text-dark">
                  <span>
                    Items per page:
                    <select
                      className="form-select d-inline-block"
                      style={{ width: "auto" }}
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(e.target.value)}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                    1-10 of 200 items
                  </span>
                  <nav>
                    <ul className="pagination pagination-sm mb-0 mt-0">
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(page - 1)}>
                          ‹
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(page + 1)}>
                          ›
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>

                {/* AI Section */}
                <div className="mt-5">
                  <h6>Risk Reassess</h6>
                  <p className="text-muted">Please Provided Details</p>
                  <form onSubmit={handleAiSubmit}>
                    <div className="ai-box">
                      <input
                        type="text"
                        placeholder="Type to ask our ai.."
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                      />
                      <div className="ai-actions">
                        <i className="fa fa-paperclip"></i>
                        <button type="submit" style={{ border: "none", background: "none" }}>
                          <i className="fa fa-paper-plane text-primary"></i>
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <button type="button" className="btn-cancel" onClick={handleCancel}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-submit">
                        Complete Assessment
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

export default RiskManagementStep3
