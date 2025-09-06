// "use client"

// import { useState } from "react"
// import Sidebar from "../components/Sidebar"
// import TopBar from "../components/TopBar"
// import { Link, useNavigate } from "react-router-dom"

// const RiskManagementStep2 = () => {
//   const [formData, setFormData] = useState({
//     dataEncryption: "",
//     vendorAudit: "",
//     mfaMigration: "",
//   })
//   const navigate = useNavigate()

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log("Form submitted:", formData)
//     navigate("/risk-management-step3")
//   }

//   const handleCancel = () => {
//     navigate("/risk-management-chat")
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
//           font-family: 'Segoe UI', sans-serif;
//           margin: 0;
//           background-color: var(--bg-light);
//           color: var(--text-light);
//           transition: all 0.3s ease;
//         }

//         .log-time {
//           font-size: 12px;
//           color: #666;
//           margin-top: 15px;
//           margin-bottom: 5px;
//         }

//         .log-entry {
//           background: #f8f9fa;
//           padding: 10px;
//           border-radius: 6px;
//           font-size: 14px;
//           line-height: 1.5;
//         }

//         .clarification-section {
//           margin-top: 30px;
//         }

//         .question {
//           font-weight: 500;
//           margin: 20px 0 10px 0;
//         }

//         .icon-question {
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
//                 <Link to="/risk-management-chat" className="btn btn-outline-secondary btn-nav">
//                   ← Back
//                 </Link>
//                 <div>
//                   <div className="step-header">Step 2 of 4: Define Clarification</div>
//                   <div className="progress-indicator">
//                     <div className="progress-bar-custom">
//                       <div className="progress-bar-fill" style={{ width: "50%" }}></div>
//                     </div>
//                   </div>
//                 </div>
//                 <Link className="btn btn-outline-secondary btn-nav" to="/risk-management-step3">
//                   Next →
//                 </Link>
//               </div>
//             </div>

//             {/* Form Card */}
//             <div className="form-card">
//               {/* System Overview */}
//               <div className="section-title text-dark">🧠 Reasoning Log</div>
//               <div className="subtext">This section provides a high-level summary of the system being assessed...</div>

//               <div className="log-time text-dark">10:35 AM</div>
//               <div className="log-entry">
//                 Initiated analysis of 'Customer Data Platform' based on provided documentation.
//                 <br />
//                 Identified potential data privacy risks due to PII handling.
//                 <br />
//                 Cross-referenced system architecture with industry best practices.
//               </div>

//               <div className="log-time text-dark">10:37 AM</div>
//               <div className="log-entry">
//                 Detected absence of explicit data encryption policy for data at rest.
//                 <br />
//                 Flagged potential compliance gaps with GDPR Article 32.
//               </div>

//               <div className="log-time text-dark">10:38 AM</div>
//               <div className="log-entry">
//                 Identified third-party API integration for payment processing.
//                 <br />
//                 Assessing vendor security posture based on available information.
//               </div>

//               <div className="log-time text-dark">10:41 AM</div>
//               <div className="log-entry">
//                 Noted use of legacy authentication protocols in one module.
//                 <br />
//                 Recommending upgrade to modern, multi-factor authentication.
//                 <br />
//                 Completed initial scan. Generating clarification questions for ambiguous areas.
//               </div>

//               {/* Clarification Questions */}
//               <div className="clarification-section">
//                 <div className="section-title text-dark">
//                   <span className="icon-question">❓</span>
//                   Clarification Questions
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                   <div className="question text-dark">Is data at rest encrypted for all sensitive data stores?</div>
//                   <select
//                     className="form-select"
//                     value={formData.dataEncryption}
//                     onChange={(e) => handleInputChange("dataEncryption", e.target.value)}
//                   >
//                     <option value="" disabled>
//                       Select An Option
//                     </option>
//                     <option value="yes">Yes</option>
//                     <option value="no">No</option>
//                     <option value="partially">Partially</option>
//                   </select>

//                   <div className="question text-dark">
//                     What is the current status of the third-party vendor security audit for the payment processing API?
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="e.g., Completed, In Progress, Not Started"
//                       value={formData.vendorAudit}
//                       onChange={(e) => handleInputChange("vendorAudit", e.target.value)}
//                     />
//                   </div>

//                   <div className="question text-dark">
//                     Are there plans to migrate from legacy authentication protocols to MFA within the next 6 months?
//                   </div>
//                   <select
//                     className="form-select"
//                     value={formData.mfaMigration}
//                     onChange={(e) => handleInputChange("mfaMigration", e.target.value)}
//                   >
//                     <option value="" disabled>
//                       Select An Option
//                     </option>
//                     <option value="yes">Yes</option>
//                     <option value="no">No</option>
//                     <option value="under-review">Under Review</option>
//                   </select>

//                   <div className="text-center mt-5">
//                     <div>
//                       <button type="button" className="btn btn-outline-secondary btn-nav me-2" onClick={handleCancel}>
//                         Cancel
//                       </button>
//                       <button type="submit" className="btn btn-success btn-nav">
//                         Continue to Step 3
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }

// export default RiskManagementStep2




"use client"

import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getReasoningLog, submitClarifications,getClarifications } from "../api/risk"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import Swal from "sweetalert2"

export default function RiskManagementStep2() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ dataEncryption: "", vendorAudit: "", mfaMigration: "" })
  const [log, setLog] = useState([])
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    const id = typeof window !== "undefined" ? localStorage.getItem("assessmentId") : null
    if (!id) {
      Swal.fire({
        icon: "warning",
        title: "No assessment found",
        text: "Please create an assessment first.",
      }).then(() => navigate("/risk-management"))
      return
    }
    getReasoningLog(id)
      .then((res) => {
        const entries = res?.data || res?.log || []
        setLog(entries)
      })
      .catch((e) => console.error("[v0] reasoning log error:", e.message))

    getClarifications(id)
      .then((res) => {
        const qs = Array.isArray(res?.data) ? res.data : []
        setQuestions(qs)
        const init = {}
        qs.forEach((q) => {
          init[q.id] = ""
        })
        setAnswers(init)
      })
      .catch((e) => console.error("[v0] clarifications load error:", e.message))
  }, [])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAnswerChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const id = localStorage.getItem("assessmentId")
      if (!id) {
        return Swal.fire({ icon: "warning", title: "Missing assessment", text: "Create an assessment first." })
      }

      if (questions.length === 0) {
        await Swal.fire({
          icon: "info",
          title: "No clarifications",
          text: "No clarification questions to answer.",
          timer: 900,
          showConfirmButton: false,
        })
        return navigate("/risk-management-step3")
      }

      const payload = { answers }
      await submitClarifications(id, payload)
      await Swal.fire({ icon: "success", title: "Clarifications submitted", timer: 1000, showConfirmButton: false })
      navigate("/risk-management-step3")
    } catch (e) {
      Swal.fire({ icon: "error", title: "Submit failed", text: e.message || "Failed to submit clarifications" })
    }
  }

  const handleCancel = () => {
    navigate("/risk-management-chat")
  }

  const tryParseJSON = (value) => {
    if (typeof value !== "string") return null
    try {
      return JSON.parse(value)
    } catch {
      return null
    }
  }

  const renderLogMessage = (msg) => {
    if (msg == null) return "-"
    if (typeof msg === "string") {
      const parsed = tryParseJSON(msg)
      if (parsed && typeof parsed === "object") {
        return <pre className="log-pre">{JSON.stringify(parsed, null, 2)}</pre>
      }
      return msg
    }
    if (Array.isArray(msg)) {
      return (
        <ul className="log-list">
          {msg.map((m, i) => (
            <li key={i}>{typeof m === "string" ? m : JSON.stringify(m, null, 2)}</li>
          ))}
        </ul>
      )
    }
    if (typeof msg === "object") {
      const text = msg.message || msg.text || msg.content || msg.summary
      if (text) return renderLogMessage(text)
      return <pre className="log-pre">{JSON.stringify(msg, null, 2)}</pre>
    }
    return String(msg)
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

        .log-pre {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 13px;
          color: #222;
        }
        .log-list {
          margin: 0;
          padding-left: 16px;
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

            <div className="form-card">
              <div className="section-title text-dark">🧠 Reasoning Log</div>
              <div className="subtext">This section provides a high-level summary of the system being assessed...</div>

              {log.map((entry, index) => {
                const time = entry?.time
                  ? entry.time // already formatted by API client; do NOT re-parse
                  : entry?.at || entry?.timestamp || entry?.createdAt
                    ? (() => {
                        const d = new Date(entry.at || entry.timestamp || entry.createdAt)
                        return isNaN(d.valueOf()) ? "" : d.toLocaleTimeString()
                      })()
                    : ""

                const messageNode = renderLogMessage(entry?.message ?? entry?.log ?? entry?.content ?? entry)
                return (
                  <div key={index}>
                    {time ? <div className="log-time text-dark">{time}</div> : null}
                    <div className="log-entry">{messageNode}</div>
                  </div>
                )
              })}

              <div className="clarification-section">
                <div className="section-title text-dark">
                  <span className="icon-question">❓</span>
                  Clarification Questions
                </div>

                <form onSubmit={handleSubmit}>
                  {questions.length > 0 ? (
                    <div className="mb-4">
                      {questions.map((q) => (
                        <div key={q.id} className="mb-4">
                          <div className="question text-dark">{q.question}</div>

                          {q.type === "single" && q.options?.length ? (
                            <div>
                              {q.options.map((opt) => (
                                <label key={opt.value} className="d-block mb-2">
                                  <input
                                    type="radio"
                                    name={`q_${q.id}`}
                                    value={opt.value}
                                    checked={answers[q.id] === opt.value}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                    className="me-2"
                                  />
                                  {opt.label}
                                </label>
                              ))}
                            </div>
                          ) : q.type === "select" && q.options?.length ? (
                            <select
                              className="form-select"
                              value={answers[q.id] || ""}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            >
                              <option value="" disabled>
                                Select an option
                              </option>
                              {q.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              className="form-control"
                              value={answers[q.id] || ""}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              placeholder="Type your answer"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted">No clarification questions were returned for this assessment.</div>
                  )}

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


