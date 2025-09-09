import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getReasoningLog, submitClarifications, getClarifications } from "../api/risk"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import Swal from "sweetalert2"

export default function RiskManagementStep2() {
  const navigate = useNavigate()
  const [log, setLog] = useState([])
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const scopeId = typeof window !== "undefined" ? localStorage.getItem("scopeId") : null
    if (!scopeId) {
      Swal.fire({
        icon: "warning",
        title: "No scope found",
        text: "Please create an assessment first.",
      }).then(() => navigate("/risk-management"))
      return
    }

    getReasoningLog(scopeId)
      .then((res) => {
        console.log("[v0] Analysis response:", res)
        const entries = res?.data || []
        setLog(entries)

        return getClarifications(scopeId)
      })
      .then((res) => {
        console.log("[v0] Clarifications response:", res)
        const qs = Array.isArray(res?.data) ? res.data : []
        setQuestions(qs)
        const init = {}
        qs.forEach((q) => {
          init[q.id] = ""
        })
        setAnswers(init)
        setLoading(false)
      })
      .catch((e) => {
        console.error("[v0] API error:", e.message)
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Failed to load analysis",
          text: e.message || "Failed to load risk analysis data",
        })
      })
  }, [navigate])

  const handleAnswerChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const scopeId = localStorage.getItem("scopeId")
      if (!scopeId) {
        return Swal.fire({ icon: "warning", title: "Missing scope", text: "Create an assessment first." })
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

      const unanswered = questions.filter((q) => !answers[q.id])
      if (unanswered.length > 0) {
        return Swal.fire({
          icon: "warning",
          title: "Please answer all questions",
          text: "All clarification questions must be answered before proceeding.",
        })
      }

      const payload = { answers }
      await submitClarifications(scopeId, payload)
      await Swal.fire({ icon: "success", title: "Clarifications submitted", timer: 1000, showConfirmButton: false })
      navigate("/risk-management-step3")
    } catch (e) {
      console.error("[v0] Submit error:", e)
      Swal.fire({ icon: "error", title: "Submit failed", text: e.message || "Failed to submit clarifications" })
    }
  }

  const handleCancel = () => {
    navigate("/risk-management-chat")
  }

  const renderLogMessage = (msg) => {
    if (msg == null) return "-"
    if (typeof msg === "string") return msg
    if (Array.isArray(msg)) {
      return (
        <ul className="log-list">
          {msg.map((m, i) => (
            <li key={i}>{typeof m === "string" ? m : JSON.stringify(m, null, 2)}</li>
          ))}
        </ul>
      )
    }
    return JSON.stringify(msg, null, 2)
  }

  if (loading) {
    return (
      <main className="main">
        <Sidebar />
        <div className="main2">
          <TopBar />
          <div className="middle">
            <div className="container text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading risk analysis...</p>
            </div>
          </div>
        </div>
      </main>
    )
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

              {log.length > 0 ? (
                log.map((entry, index) => (
                  <div key={index}>
                    <div className="log-time text-dark">{new Date().toLocaleTimeString()}</div>
                    <div className="log-entry">{renderLogMessage(entry)}</div>
                  </div>
                ))
              ) : (
                <div className="log-entry">No reasoning log available for this analysis.</div>
              )}

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

                          <div>
                            <label className="d-block mb-2">
                              <input
                                type="radio"
                                name={`q_${q.id}`}
                                value="yes"
                                checked={answers[q.id] === "yes"}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                className="me-2"
                              />
                              Yes
                            </label>
                            <label className="d-block mb-2">
                              <input
                                type="radio"
                                name={`q_${q.id}`}
                                value="no"
                                checked={answers[q.id] === "no"}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                className="me-2"
                              />
                              No
                            </label>
                          </div>
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

