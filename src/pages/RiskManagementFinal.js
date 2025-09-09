
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { getDashboard, listAssessments, downloadAssessmentReport } from "../api/risk"
// import Sidebar from "../components/Sidebar"
// import TopBar from "../components/TopBar"

// const RiskManagementFinal = () => {
//   const navigate = useNavigate()
//   const [itemsPerPage, setItemsPerPage] = useState(10)
//   const [metrics, setMetrics] = useState({
//     totalAssessments: 0,
//     totalRisks: 0,
//     top5HighRisks: [], // Updated to match backend response
//     chartData: [], // Updated to match backend response
//   })
//   const [assessments, setAssessments] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)

//         const dashboardRes = await getDashboard()
//         console.log("[v0] Dashboard response:", dashboardRes)
//         setMetrics({
//           totalAssessments: dashboardRes?.data?.totalAssessments || 0,
//           totalRisks: dashboardRes?.data?.totalRisks || 0,
//           top5HighRisks: dashboardRes?.data?.top5HighRisks || [],
//           chartData: dashboardRes?.data?.chartData || [],
//         })

//         const assessmentsRes = await listAssessments({ page: 1, limit: itemsPerPage })
//         console.log("[v0] Assessments response:", assessmentsRes)
//         setAssessments(assessmentsRes?.data || [])
//       } catch (error) {
//         console.error("[v0] Error fetching dashboard data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [itemsPerPage])

//   const handleNewAssessment = () => navigate("/risk-management-chat")

//   const handleDownload = async () => {
//     const scopeId = typeof window !== "undefined" ? localStorage.getItem("scopeId") : null
//     if (!scopeId) {
//       alert("No assessment selected")
//       return
//     }
//     try {
//       await downloadAssessmentReport(scopeId)
//     } catch (error) {
//       console.error("[v0] Download error:", error)
//       alert("Failed to download report")
//     }
//   }

//   const getBadgeClass = (level) => {
//     switch (level.toLowerCase()) {
//       case "high":
//         return "badge-high"
//       case "low":
//         return "badge-low"
//       case "mid":
//       case "medium":
//         return "badge-mid"
//       default:
//         return "badge-mid"
//     }
//   }

//   if (loading) {
//     return (
//       <main className="main">
//         <Sidebar />
//         <div className="main2">
//           <TopBar />
//           <div className="middle d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
//             <div className="text-center">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-2">Loading dashboard data...</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     )
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

//         .metric-card {
//           border-radius: 14px;
//           background: #fff;
//           padding: 18px 20px;
//           box-shadow: 0px 4px 12px rgba(0,0,0,0.04);
//           display: flex;
//           align-items: center;
//           gap: 14px;
//         }

//         .metric-icon {
//           width: 42px;
//           height: 42px;
//           background: #e8f9f8;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #0bbba7;
//           font-size: 18px;
//         }

//         .metric-value {
//           font-size: 22px;
//           font-weight: 600;
//         }

//         .metric-label {
//           font-size: 12px;
//           color: #777;
//         }

//         .badge-high {
//           background-color: #ff6b6b;
//           font-size: 11px;
//           color: white;
//           padding: 3px 10px;
//           border-radius: 6px;
//         }

//         .badge-low {
//           background-color: #51cf66;
//           font-size: 11px;
//           color: white;
//           padding: 3px 10px;
//           border-radius: 6px;
//         }

//         .badge-mid {
//           background-color: #ffd43b;
//           font-size: 11px;
//           color: #333;
//           padding: 3px 10px;
//           border-radius: 6px;
//         }

//         .top-risk-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }

//         .top-risk-list li {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 6px 0;
//           font-size: 13px;
//           border-bottom: 1px solid #f3f3f3;
//         }

//         .table th {
//           background-color: #fafafa;
//           font-weight: 600;
//           font-size: 13px;
//         }

//         .table td {
//           font-size: 13px;
//         }

//         .download-btn {
//           background-color: #2ed2c9;
//           color: white;
//           border-radius: 50px;
//           padding: 8px 18px;
//           border: none;
//         }

//         .new-assessment-btn {
//           background-color: #007bff;
//           color: white;
//           border-radius: 50px;
//           padding: 8px 18px;
//           border: none;
//           margin-right: 10px;
//         }

//         .empty-state {
//           text-align: center;
//           color: #666;
//           font-style: italic;
//           padding: 20px;
//         }

//         .no-data-message {
//           color: #888;
//           font-size: 12px;
//           text-align: center;
//           padding: 10px;
//         }
//       `}</style>

//       <main className="main">
//         <Sidebar />

//         <div className="main2">
//           <TopBar />

//           <div className="middle">
//             <div className="container text-center">
//               <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
//                 <button
//                   className="btn btn-outline-secondary btn-nav"
//                   onClick={() => navigate("/risk-management-step3")}
//                 >
//                   ← Back to Step 3
//                 </button>
//                 <div>
//                   <h4 className="mb-0">Risk Assessment Dashboard</h4>
//                   <small className="text-muted">Assessment Complete - Final Results</small>
//                 </div>
//                 <button className="new-assessment-btn" onClick={handleNewAssessment}>
//                   + New Assessment
//                 </button>
//               </div>
//             </div>

//             {/* Form Card */}
//             <div className="form-card">
//               {/* Metrics Row */}
//               <div className="row g-3 mb-3">
//                 <div className="col-md-6">
//                   <div className="metric-card">
//                     <div className="metric-icon">
//                       <i className="fa fa-check"></i>
//                     </div>
//                     <div>
//                       <div className="metric-value">{metrics.totalAssessments.toLocaleString()}</div>
//                       <div className="metric-label">Total Assessments Completed</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="metric-card">
//                     <div className="metric-icon">
//                       <i className="fa fa-exclamation-triangle"></i>
//                     </div>
//                     <div>
//                       <div className="metric-value">{metrics.totalRisks.toLocaleString()}</div>
//                       <div className="metric-label">Total Risks Identified</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Chart and Top Risks */}
//               <div className="row g-3">
//                 <div className="col-md-8">
//                   <h6 className="mb-2">
//                     Stats <small className="text-success">(+50) more in 2025</small>
//                   </h6>
//                   {metrics.chartData.length > 0 ? (
//                     <div style={{ backgroundImage: "linear-gradient(#00c6a7, #1e4d92)" }}>
//                       <canvas id="statsChart" height="100"></canvas>
//                     </div>
//                   ) : (
//                     <div
//                       className="empty-state"
//                       style={{
//                         backgroundImage: "linear-gradient(#00c6a7, #1e4d92)",
//                         minHeight: "200px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <div className="no-data-message" style={{ color: "white" }}>
//                         No chart data available yet. Complete some assessments to see statistics.
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="col-md-4">
//                   <h6>Top 5 High-Severity Risk</h6>
//                   <ul className="top-risk-list">
//                     {metrics.top5HighRisks.length > 0 ? (
//                       metrics.top5HighRisks.map((risk, index) => (
//                         <li key={index}>
//                           <span>
//                             {risk.id}: {risk.title}
//                           </span>
//                           <span className={getBadgeClass(risk.riskLevel)}>{risk.riskLevel}</span>
//                         </li>
//                       ))
//                     ) : (
//                       <li className="no-data-message">
//                         No high-severity risks found. Complete risk assessments to see top risks here.
//                       </li>
//                     )}
//                   </ul>
//                 </div>
//               </div>

//               {/* Table */}
//               <div className="table-responsive mt-4">
//                 <table className="table align-middle">
//                   <thead>
//                     <tr>
//                       <th>
//                         <input type="checkbox" />
//                       </th>
//                       <th>Risk Assessment Title</th>
//                       <th>Risk Assessment Date</th>
//                       <th>Last updated</th>
//                       <th>System</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {assessments.length > 0 ? (
//                       assessments.map((item, index) => (
//                         <tr key={index}>
//                           <td>
//                             <input type="checkbox" />
//                           </td>
//                           <td>{item.title}</td>
//                           <td>{item.assessmentDate}</td>
//                           <td>{item.lastUpdated}</td>
//                           <td>
//                             <span className={getBadgeClass(item.system)}>{item.system}</span>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="5" className="text-center">
//                           <div className="no-data-message">
//                             No assessments found. Click "New Assessment" to create your first risk assessment.
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               <div className="d-flex justify-content-between align-items-center mt-2">
//                 <span>
//                   Items per page:{" "}
//                   <select
//                     className="form-select d-inline-block"
//                     style={{ width: "auto" }}
//                     value={itemsPerPage}
//                     onChange={(e) => setItemsPerPage(e.target.value)}
//                   >
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                     <option value="50">50</option>
//                   </select>{" "}
//                   1-{Math.min(itemsPerPage, assessments.length)} of {assessments.length} items
//                 </span>
//                 <nav>
//                   <ul className="pagination pagination-sm mt-0 mb-0">
//                     <li className="page-item">
//                       <a className="page-link" href="#">
//                         ‹
//                       </a>
//                     </li>
//                     <li className="page-item">
//                       <a className="page-link" href="#">
//                         ›
//                       </a>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>

//               {/* Download Button */}
//               <div className="mt-3 text-end">
//                 <button className="download-btn" onClick={handleDownload}>
//                   <i className="fa fa-download me-1"></i> Download Report
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <script
//         dangerouslySetInnerHTML={{
//           __html: `
//             if (typeof Chart !== 'undefined') {
//               const ctx = document.getElementById('statsChart');
//               if (ctx) {
//                 const chartData = ${JSON.stringify(metrics.chartData)};
//                 const chartValues = chartData.length > 0 ? chartData.map(d => d.value || 0) : [0];
//                 const chartLabels = chartData.length > 0 ? chartData.map(d => d.month || '') : [''];
                
//                 new Chart(ctx.getContext('2d'), {
//                   type: 'bar',
//                   data: {
//                     labels: chartLabels,
//                     datasets: [{
//                       data: chartValues,
//                       backgroundColor: function(context) {
//                         const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 200);
//                         gradient.addColorStop(0, '#ffffff');
//                         gradient.addColorStop(1, '#ffffff');
//                         return gradient;
//                       },
//                       borderRadius: 20,
//                       barPercentage: 0.2,
//                       categoryPercentage: 0.6
//                     }]
//                   },
//                   options: {
//                     responsive: true,
//                     plugins: { legend: { display: false } },
//                     scales: {
//                       x: { grid: { display: false }, ticks: { display: false } },
//                       y: { grid: { color: 'transparent' }, ticks: { color: '#fff' } }
//                     }
//                   }
//                 });
//               }
//             }
//           `,
//         }}
//       />
//     </>
//   )
// }

// export default RiskManagementFinal


"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getDashboard, listAssessments, downloadAssessmentReport } from "../api/risk"
import Sidebar from "../components/Sidebar"

const RiskManagementFinal = () => {
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [currentChatId, setCurrentChatId] = useState(null)
  const [sidebarRefreshTrigger, setSidebarRefreshTrigger] = useState(0)
  const roleModule = "risk"

  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [metrics, setMetrics] = useState({
    totalAssessments: 0,
    totalRisks: 0,
    top5HighRisks: [],
    chartData: [],
  })
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const dashboardRes = await getDashboard()
        console.log("[v0] Dashboard response:", dashboardRes)
        setMetrics({
          totalAssessments: dashboardRes?.data?.totalAssessments || 0,
          totalRisks: dashboardRes?.data?.totalRisks || 0,
          top5HighRisks: dashboardRes?.data?.top5HighRisks || [],
          chartData: dashboardRes?.data?.chartData || [],
        })

        const assessmentsRes = await listAssessments({ page: 1, limit: itemsPerPage })
        console.log("[v0] Assessments response:", assessmentsRes)
        setAssessments(assessmentsRes?.data || [])
      } catch (error) {
        console.error("[v0] Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [itemsPerPage])

  const handleNewAssessment = () => navigate("/risk-management-chat")

  const handleDownload = async () => {
    const scopeId = typeof window !== "undefined" ? localStorage.getItem("scopeId") : null
    if (!scopeId) {
      alert("No assessment selected")
      return
    }
    try {
      await downloadAssessmentReport(scopeId)
    } catch (error) {
      console.error("[v0] Download error:", error)
      alert("Failed to download report")
    }
  }

  const getBadgeClass = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "badge-high"
      case "low":
        return "badge-low"
      case "mid":
      case "medium":
        return "badge-mid"
      default:
        return "badge-mid"
    }
  }

  if (loading) {
    return (
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
          <div className="middle d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading dashboard data...</p>
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
          margin: 0;
          background-color: var(--bg-light);
          color: var(--text-light);
          transition: all 0.3s ease;
        }

        .metric-card {
          border-radius: 14px;
          background: #fff;
          padding: 18px 20px;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .metric-icon {
          width: 42px;
          height: 42px;
          background: #e8f9f8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0bbba7;
          font-size: 18px;
        }

        .metric-value {
          font-size: 22px;
          font-weight: 600;
        }

        .metric-label {
          font-size: 12px;
          color: #777;
        }

        .badge-high {
          background-color: #ff6b6b;
          font-size: 11px;
          color: white;
          padding: 3px 10px;
          border-radius: 6px;
        }

        .badge-low {
          background-color: #51cf66;
          font-size: 11px;
          color: white;
          padding: 3px 10px;
          border-radius: 6px;
        }

        .badge-mid {
          background-color: #ffd43b;
          font-size: 11px;
          color: #333;
          padding: 3px 10px;
          border-radius: 6px;
        }

        .top-risk-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .top-risk-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          font-size: 13px;
          border-bottom: 1px solid #f3f3f3;
        }

        .table th {
          background-color: #fafafa;
          font-weight: 600;
          font-size: 13px;
        }

        .table td {
          font-size: 13px;
        }

        .download-btn {
          background-color: #2ed2c9;
          color: white;
          border-radius: 50px;
          padding: 8px 18px;
          border: none;
        }

        .new-assessment-btn {
          background-color: #007bff;
          color: white;
          border-radius: 50px;
          padding: 8px 18px;
          border: none;
          margin-right: 10px;
        }

        .empty-state {
          text-align: center;
          color: #666;
          font-style: italic;
          padding: 20px;
        }

        .no-data-message {
          color: #888;
          font-size: 12px;
          text-align: center;
          padding: 10px;
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
              <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                <button
                  className="btn btn-outline-secondary btn-nav"
                  onClick={() => navigate("/risk-management-step3")}
                >
                  ← Back to Step 3
                </button>
                <div>
                  <h4 className="mb-0">Risk Assessment Dashboard</h4>
                  <small className="text-muted">Assessment Complete - Final Results</small>
                </div>
                <button className="new-assessment-btn" onClick={handleNewAssessment}>
                  + New Assessment
                </button>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              {/* Metrics Row */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <div className="metric-card">
                    <div className="metric-icon">
                      <i className="fa fa-check"></i>
                    </div>
                    <div>
                      <div className="metric-value">{metrics.totalAssessments.toLocaleString()}</div>
                      <div className="metric-label">Total Assessments Completed</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="metric-card">
                    <div className="metric-icon">
                      <i className="fa fa-exclamation-triangle"></i>
                    </div>
                    <div>
                      <div className="metric-value">{metrics.totalRisks.toLocaleString()}</div>
                      <div className="metric-label">Total Risks Identified</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart and Top Risks */}
              <div className="row g-3">
                <div className="col-md-8">
                  <h6 className="mb-2">
                    Stats <small className="text-success">(+50) more in 2025</small>
                  </h6>
                  {metrics.chartData.length > 0 ? (
                    <div style={{ backgroundImage: "linear-gradient(#00c6a7, #1e4d92)" }}>
                      <canvas id="statsChart" height="100"></canvas>
                    </div>
                  ) : (
                    <div
                      className="empty-state"
                      style={{
                        backgroundImage: "linear-gradient(#00c6a7, #1e4d92)",
                        minHeight: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="no-data-message" style={{ color: "white" }}>
                        No chart data available yet. Complete some assessments to see statistics.
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-4">
                  <h6>Top 5 High-Severity Risk</h6>
                  <ul className="top-risk-list">
                    {metrics.top5HighRisks.length > 0 ? (
                      metrics.top5HighRisks.map((risk, index) => (
                        <li key={index}>
                          <span>
                            {risk.id}: {risk.title}
                          </span>
                          <span className={getBadgeClass(risk.riskLevel)}>{risk.riskLevel}</span>
                        </li>
                      ))
                    ) : (
                      <li className="no-data-message">
                        No high-severity risks found. Complete risk assessments to see top risks here.
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive mt-4">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>Risk Assessment Title</th>
                      <th>Risk Assessment Date</th>
                      <th>Last updated</th>
                      <th>System</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.length > 0 ? (
                      assessments.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>{item.title}</td>
                          <td>{item.assessmentDate}</td>
                          <td>{item.lastUpdated}</td>
                          <td>
                            <span className={getBadgeClass(item.system)}>{item.system}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          <div className="no-data-message">
                            No assessments found. Click "New Assessment" to create your first risk assessment.
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span>
                  Items per page:{" "}
                  <select
                    className="form-select d-inline-block"
                    style={{ width: "auto" }}
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>{" "}
                  1-{Math.min(itemsPerPage, assessments.length)} of {assessments.length} items
                </span>
                <nav>
                  <ul className="pagination pagination-sm mt-0 mb-0">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        ‹
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        ›
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Download Button */}
              <div className="mt-3 text-end">
                <button className="download-btn" onClick={handleDownload}>
                  <i className="fa fa-download me-1"></i> Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof Chart !== 'undefined') {
              const ctx = document.getElementById('statsChart');
              if (ctx) {
                const chartData = ${JSON.stringify(metrics.chartData)};
                const chartValues = chartData.length > 0 ? chartData.map(d => d.value || 0) : [0];
                const chartLabels = chartData.length > 0 ? chartData.map(d => d.month || '') : [''];
                
                new Chart(ctx.getContext('2d'), {
                  type: 'bar',
                  data: {
                    labels: chartLabels,
                    datasets: [{
                      data: chartValues,
                      backgroundColor: function(context) {
                        const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 200);
                        gradient.addColorStop(0, '#ffffff');
                        gradient.addColorStop(1, '#ffffff');
                        return gradient;
                      },
                      borderRadius: 20,
                      barPercentage: 0.2,
                      categoryPercentage: 0.6
                    }]
                  },
                  options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { grid: { display: false }, ticks: { display: false } },
                      y: { grid: { color: 'transparent' }, ticks: { color: '#fff' } }
                    }
                  }
                });
              }
            }
          `,
        }}
      />
    </>
  )
}

export default RiskManagementFinal
