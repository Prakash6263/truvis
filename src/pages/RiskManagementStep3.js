

// "use client"
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { getRiskAssessment, reassessRisks, completeAssessment } from "../api/risk"
// import Sidebar from "../components/Sidebar"
// import TopBar from "../components/TopBar"
// import { Link } from "react-router-dom"
// import jsPDF from "jspdf"
// import autoTable from "jspdf-autotable"
// import Swal from "sweetalert2"

// const RiskManagementStep3 = () => {
//   const navigate = useNavigate()
//   const [selectedRisks, setSelectedRisks] = useState([])
//   const [aiInput, setAiInput] = useState("")
//   const [itemsPerPage, setItemsPerPage] = useState(10)
//   const [risks, setRisks] = useState([])
//   const [page, setPage] = useState(1)
//   const [loading, setLoading] = useState(false)

//   const handleCancel = () => {
//     navigate("/risk-management-step2")
//   }

//   useEffect(() => {
//     const scopeId = localStorage.getItem("scopeId")
//     if (!scopeId) {
//       console.error("[v0] No scope ID found")
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "No scope ID found. Please start from the beginning.",
//         confirmButtonColor: "#3AC6BD",
//       })
//       return
//     }

//     console.log("[v0] Starting risk assessment fetch with scopeId:", scopeId)
//     setLoading(true)
//     getRiskAssessment(scopeId)
//       .then((res) => {
//         console.log("[v0] Risk assessment response:", res)
//         const risksData = res?.data || []
//         console.log("[v0] Extracted risks data:", risksData)
//         console.log("[v0] Setting risks state with", risksData.length, "items")
//         setRisks(risksData)
//         setTimeout(() => {
//           console.log("[v0] Current risks state after update:", risksData)
//         }, 100)
//       })
//       .catch((e) => {
//         console.error("[v0] Risk assessment error:", e.message)
//         Swal.fire({
//           icon: "error",
//           title: "Failed to Load",
//           text: "Failed to load risk assessment: " + e.message,
//           confirmButtonColor: "#3AC6BD",
//         })
//       })
//       .finally(() => setLoading(false))
//   }, [page, itemsPerPage])

//   const handleRiskSelect = (riskId) => {
//     setSelectedRisks((prev) => (prev.includes(riskId) ? prev.filter((id) => id !== riskId) : [...prev, riskId]))
//   }

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedRisks(risks.map((risk) => risk.id))
//     } else {
//       setSelectedRisks([])
//     }
//   }

//   const handleAiSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const scopeId = localStorage.getItem("scopeId")
//       if (aiInput || selectedRisks.length) {
//         await reassessRisks({ assessmentId: scopeId, riskIds: selectedRisks, prompt: aiInput })
//       }
//       await completeAssessment(scopeId)

//       Swal.fire({
//         icon: "success",
//         title: "Assessment Complete!",
//         text: "Risk assessment has been completed successfully.",
//         confirmButtonColor: "#3AC6BD",
//       }).then(() => {
//         navigate("/risk-management-final")
//       })
//     } catch (e) {
//       Swal.fire({
//         icon: "error",
//         title: "Assessment Failed",
//         text: e.message || "Failed to complete assessment",
//         confirmButtonColor: "#3AC6BD",
//       })
//     }
//   }

//   const handleDownload = async () => {
//     try {
//       if (risks.length === 0) {
//         Swal.fire({
//           icon: "warning",
//           title: "No Data",
//           text: "No risk data available to download",
//           confirmButtonColor: "#3AC6BD",
//         })
//         return
//       }

//       Swal.fire({
//         title: "Generating PDF...",
//         text: "Please wait while we generate your risk assessment report.",
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading()
//         },
//       })

//       const doc = new jsPDF()

//       doc.setFontSize(20)
//       doc.setTextColor(40, 40, 40)
//       doc.text("Risk Assessment Report", 20, 30)

//       doc.setFontSize(12)
//       doc.setTextColor(100, 100, 100)
//       doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45)

//       const scopeId = localStorage.getItem("scopeId")
//       if (scopeId) {
//         doc.text(`Scope ID: ${scopeId}`, 20, 55)
//       }

//       const tableData = risks.map((risk) => [risk.id, risk.title, risk.impact, risk.likelihood, risk.riskLevel])

//       autoTable(doc, {
//         head: [["Risk ID", "Title", "Impact", "Likelihood", "Risk Level"]],
//         body: tableData,
//         startY: 70,
//         styles: {
//           fontSize: 10,
//           cellPadding: 5,
//         },
//         headStyles: {
//           fillColor: [58, 198, 189],
//           textColor: 255,
//           fontStyle: "bold",
//         },
//         alternateRowStyles: {
//           fillColor: [249, 249, 249],
//         },
//         columnStyles: {
//           1: { cellWidth: 60 },
//           4: {
//             cellWidth: 25,
//             halign: "center",
//           },
//         },
//       })

//       const finalY = doc.lastAutoTable.finalY + 20
//       doc.setFontSize(14)
//       doc.setTextColor(40, 40, 40)
//       doc.text("Risk Summary", 20, finalY)

//       const riskCounts = risks.reduce((acc, risk) => {
//         const level = risk.riskLevel.toLowerCase()
//         acc[level] = (acc[level] || 0) + 1
//         return acc
//       }, {})

//       doc.setFontSize(12)
//       doc.setTextColor(100, 100, 100)
//       let summaryY = finalY + 15
//       doc.text(`Total Risks: ${risks.length}`, 20, summaryY)
//       summaryY += 10

//       if (riskCounts.high) {
//         doc.setTextColor(255, 107, 107)
//         doc.text(`High Risk: ${riskCounts.high}`, 20, summaryY)
//         summaryY += 10
//       }
//       if (riskCounts.mid || riskCounts.medium) {
//         doc.setTextColor(255, 212, 59)
//         doc.text(`Medium Risk: ${riskCounts.mid || riskCounts.medium || 0}`, 20, summaryY)
//         summaryY += 10
//       }
//       if (riskCounts.low) {
//         doc.setTextColor(81, 207, 102)
//         doc.text(`Low Risk: ${riskCounts.low}`, 20, summaryY)
//       }

//       const fileName = `Risk_Assessment_Report_${new Date().toISOString().split("T")[0]}.pdf`
//       doc.save(fileName)

//       Swal.fire({
//         icon: "success",
//         title: "PDF Generated!",
//         text: `Risk assessment report has been downloaded as ${fileName}`,
//         confirmButtonColor: "#3AC6BD",
//       })
//     } catch (error) {
//       console.error("PDF generation error:", error)
//       Swal.fire({
//         icon: "error",
//         title: "PDF Generation Failed",
//         text: "Failed to generate PDF: " + error.message,
//         confirmButtonColor: "#3AC6BD",
//       })
//     }
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
//                 <Link to="/risk-management-final" className="btn btn-outline-secondary btn-nav">
//                   Next →
//                 </Link>
//               </div>
//             </div>

//             <div className="form-card">
//               <div className="page-container">
//                 <div className="d-flex justify-content-between">
//                   <div>
//                     <h6>Risk Register</h6>
//                     <p className="text-muted">Please Provided Details</p>
//                   </div>
//                   <div>
//                     <button className="download-btn" onClick={handleDownload}>
//                       <i className="fa fa-download me-1"></i> Download
//                     </button>
//                   </div>
//                 </div>

//                 <div className="table-responsive mt-4">
//                   {loading ? (
//                     <div className="text-center py-4">
//                       <div className="spinner-border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                       </div>
//                     </div>
//                   ) : (
//                     <table className="table align-middle">
//                       <thead>
//                         <tr>
//                           <th>
//                             <input
//                               type="checkbox"
//                               onChange={handleSelectAll}
//                               checked={selectedRisks.length === risks.length && risks.length > 0}
//                             />
//                           </th>
//                           <th>Risk ID</th>
//                           <th>Title</th>
//                           <th>Impact</th>
//                           <th>Likelihood</th>
//                           <th>Risk Level</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {risks.length === 0 ? (
//                           <tr>
//                             <td colSpan="7" className="text-center py-4">
//                               No risks found
//                             </td>
//                           </tr>
//                         ) : (
//                           risks.map((risk) => (
//                             <tr key={risk.id}>
//                               <td>
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRisks.includes(risk.id)}
//                                   onChange={() => handleRiskSelect(risk.id)}
//                                 />
//                               </td>
//                               <td>{risk.id}</td>
//                               <td>{risk.title}</td>
//                               <td>
//                                 {risk.impact} <i className="fa fa-wrench ms-1"></i>
//                               </td>
//                               <td>{risk.likelihood}</td>
//                               <td>
//                                 <span className={getRiskBadgeClass(risk.riskLevel)}>{risk.riskLevel}</span>
//                               </td>
//                               <td>
//                                 <i className="fa fa-eye"></i>
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                   )}
//                 </div>

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
//                     1-{Math.min(itemsPerPage, risks.length)} of {risks.length} items
//                   </span>
//                   <nav>
//                     <ul className="pagination pagination-sm mb-0 mt-0">
//                       <li className="page-item">
//                         <a className="page-link" href="#" onClick={() => setPage(page - 1)}>
//                           ‹
//                         </a>
//                       </li>
//                       <li className="page-item">
//                         <a className="page-link" href="#" onClick={() => setPage(page + 1)}>
//                           ›
//                         </a>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div>

//                 <div className="mt-5">
                  
//                   <form onSubmit={handleAiSubmit}>
                    
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
import { getRiskAssessment, reassessRisks, completeAssessment } from "../api/risk"
import Sidebar from "../components/Sidebar"
import { Link } from "react-router-dom"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import Swal from "sweetalert2"

const RiskManagementStep3 = () => {
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [currentChatId, setCurrentChatId] = useState(null)
  const [sidebarRefreshTrigger, setSidebarRefreshTrigger] = useState(0)
  const roleModule = "risk"

  const [selectedRisks, setSelectedRisks] = useState([])
  const [aiInput, setAiInput] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [risks, setRisks] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleNewChat = () => {
    setCurrentChatId(null)
    setSidebarRefreshTrigger((prev) => prev + 1)
  }

  const handleChatSelect = (chatId) => {
    setCurrentChatId(chatId)
  }

  const handleCancel = () => {
    navigate("/risk-management-step2")
  }

  useEffect(() => {
    const scopeId = localStorage.getItem("scopeId")
    if (!scopeId) {
      console.error("[v0] No scope ID found")
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No scope ID found. Please start from the beginning.",
        confirmButtonColor: "#3AC6BD",
      })
      return
    }

    console.log("[v0] Starting risk assessment fetch with scopeId:", scopeId)
    setLoading(true)
    getRiskAssessment(scopeId)
      .then((res) => {
        console.log("[v0] Risk assessment response:", res)
        const risksData = res?.data || []
        console.log("[v0] Extracted risks data:", risksData)
        console.log("[v0] Setting risks state with", risksData.length, "items")
        setRisks(risksData)
        setTimeout(() => {
          console.log("[v0] Current risks state after update:", risksData)
        }, 100)
      })
      .catch((e) => {
        console.error("[v0] Risk assessment error:", e.message)
        Swal.fire({
          icon: "error",
          title: "Failed to Load",
          text: "Failed to load risk assessment: " + e.message,
          confirmButtonColor: "#3AC6BD",
        })
      })
      .finally(() => setLoading(false))
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
      const scopeId = localStorage.getItem("scopeId")
      if (aiInput || selectedRisks.length) {
        await reassessRisks({ assessmentId: scopeId, riskIds: selectedRisks, prompt: aiInput })
      }
      await completeAssessment(scopeId)

      Swal.fire({
        icon: "success",
        title: "Assessment Complete!",
        text: "Risk assessment has been completed successfully.",
        confirmButtonColor: "#3AC6BD",
      }).then(() => {
        navigate("/risk-management-final")
      })
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Assessment Failed",
        text: e.message || "Failed to complete assessment",
        confirmButtonColor: "#3AC6BD",
      })
    }
  }

  const handleDownload = async () => {
    try {
      if (risks.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "No Data",
          text: "No risk data available to download",
          confirmButtonColor: "#3AC6BD",
        })
        return
      }

      Swal.fire({
        title: "Generating PDF...",
        text: "Please wait while we generate your risk assessment report.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      const doc = new jsPDF()

      doc.setFontSize(20)
      doc.setTextColor(40, 40, 40)
      doc.text("Risk Assessment Report", 20, 30)

      doc.setFontSize(12)
      doc.setTextColor(100, 100, 100)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45)

      const scopeId = localStorage.getItem("scopeId")
      if (scopeId) {
        doc.text(`Scope ID: ${scopeId}`, 20, 55)
      }

      const tableData = risks.map((risk) => [risk.id, risk.title, risk.impact, risk.likelihood, risk.riskLevel])

      autoTable(doc, {
        head: [["Risk ID", "Title", "Impact", "Likelihood", "Risk Level"]],
        body: tableData,
        startY: 70,
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        headStyles: {
          fillColor: [58, 198, 189],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [249, 249, 249],
        },
        columnStyles: {
          1: { cellWidth: 60 },
          4: {
            cellWidth: 25,
            halign: "center",
          },
        },
      })

      const finalY = doc.lastAutoTable.finalY + 20
      doc.setFontSize(14)
      doc.setTextColor(40, 40, 40)
      doc.text("Risk Summary", 20, finalY)

      const riskCounts = risks.reduce((acc, risk) => {
        const level = risk.riskLevel.toLowerCase()
        acc[level] = (acc[level] || 0) + 1
        return acc
      }, {})

      doc.setFontSize(12)
      doc.setTextColor(100, 100, 100)
      let summaryY = finalY + 15
      doc.text(`Total Risks: ${risks.length}`, 20, summaryY)
      summaryY += 10

      if (riskCounts.high) {
        doc.setTextColor(255, 107, 107)
        doc.text(`High Risk: ${riskCounts.high}`, 20, summaryY)
        summaryY += 10
      }
      if (riskCounts.mid || riskCounts.medium) {
        doc.setTextColor(255, 212, 59)
        doc.text(`Medium Risk: ${riskCounts.mid || riskCounts.medium || 0}`, 20, summaryY)
        summaryY += 10
      }
      if (riskCounts.low) {
        doc.setTextColor(81, 207, 102)
        doc.text(`Low Risk: ${riskCounts.low}`, 20, summaryY)
      }

      const fileName = `Risk_Assessment_Report_${new Date().toISOString().split("T")[0]}.pdf`
      doc.save(fileName)

      Swal.fire({
        icon: "success",
        title: "PDF Generated!",
        text: `Risk assessment report has been downloaded as ${fileName}`,
        confirmButtonColor: "#3AC6BD",
      })
    } catch (error) {
      console.error("PDF generation error:", error)
      Swal.fire({
        icon: "error",
        title: "PDF Generation Failed",
        text: "Failed to generate PDF: " + error.message,
        confirmButtonColor: "#3AC6BD",
      })
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
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={toggleSidebar}
          onNewChat={handleNewChat}
          onChatSelect={handleChatSelect}
          activeChatId={currentChatId}
          refreshTrigger={sidebarRefreshTrigger}
          roleModule={roleModule}
        />

        <div className="main2">
          <div className="topbar mb-3">
            <div>
              <button className="btn btn-toggle-sidebar w-auto" id="sidebarToggle" onClick={toggleSidebar}>
                <i className="fas fa-bars" />
              </button>
            </div>
            <div className="right w-auto">
              <button className="coin theme-btn">50 Coin</button>
              <i className="fas fa-bell icon" />
              <img src="assets/img/Avatar.png" className="rounded-circle" alt="User" />
            </div>
          </div>

          <div className="middle">
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
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              onChange={handleSelectAll}
                              checked={selectedRisks.length === risks.length && risks.length > 0}
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
                        {risks.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center py-4">
                              No risks found
                            </td>
                          </tr>
                        ) : (
                          risks.map((risk) => (
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
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>

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
                    1-{Math.min(itemsPerPage, risks.length)} of {risks.length} items
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

                <div className="mt-5">
                  <form onSubmit={handleAiSubmit}>
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
