// "use client"

// import { useState } from "react"
// import Sidebar from "../components/Sidebar"
// import TopBar from "../components/TopBar"
// import { Link, useNavigate } from "react-router-dom"

// const RiskManagementFinal = () => {
//   const [itemsPerPage, setItemsPerPage] = useState(10)
//   const navigate = useNavigate()

//   const assessmentData = [
//     {
//       id: "A1",
//       date: "10-10-2024",
//       lastUpdated: "10-10-2024",
//       system: "High",
//     },
//     {
//       id: "A2",
//       date: "10-10-2024",
//       lastUpdated: "10-10-2024",
//       system: "Low",
//     },
//     {
//       id: "A3",
//       date: "10-10-2024",
//       lastUpdated: "10-10-2024",
//       system: "Mid",
//     },
//   ]

//   const getBadgeClass = (level) => {
//     switch (level.toLowerCase()) {
//       case "high":
//         return "badge-high"
//       case "low":
//         return "badge-low"
//       case "mid":
//         return "badge-mid"
//       default:
//         return "badge-mid"
//     }
//   }

//   const handleNewAssessment = () => {
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
//       `}</style>

//       <main className="main">
//         <Sidebar />

//         <div className="main2">
//           <TopBar />

//           <div className="middle">
//             <div className="container text-center">
//               <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
//                 <Link to="/risk-management-step3" className="btn btn-outline-secondary btn-nav">
//                   ← Back to Step 3
//                 </Link>
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
//                       <div className="metric-value">53,000</div>
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
//                       <div className="metric-value">2,300</div>
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
//                   <div style={{ backgroundImage: "linear-gradient(#00c6a7, #1e4d92)" }}>
//                     <canvas id="statsChart" height="100"></canvas>
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <h6>Top 5 High-Severity Risk</h6>
//                   <ul className="top-risk-list">
//                     <li>
//                       R001: Data Encryption <span className="badge-high">High</span>
//                     </li>
//                     <li>
//                       R001: Data Encryption <span className="badge-high">High</span>
//                     </li>
//                     <li>
//                       R001: Data Encryption <span className="badge-high">High</span>
//                     </li>
//                     <li>
//                       R001: Data Encryption <span className="badge-high">High</span>
//                     </li>
//                     <li>
//                       R001: Data Encryption <span className="badge-high">High</span>
//                     </li>
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
//                     {assessmentData.map((item, index) => (
//                       <tr key={index}>
//                         <td>
//                           <input type="checkbox" />
//                         </td>
//                         <td>{item.id}</td>
//                         <td>{item.date}</td>
//                         <td>{item.lastUpdated}</td>
//                         <td>
//                           <span className={getBadgeClass(item.system)}>{item.system}</span>
//                         </td>
//                       </tr>
//                     ))}
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
//                   1-10 of 200 items
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
//                 <button className="download-btn">
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
//                 new Chart(ctx.getContext('2d'), {
//                   type: 'bar',
//                   data: {
//                     labels: Array(10).fill(''),
//                     datasets: [{
//                       data: [150, 80, 300, 100, 500, 450, 350, 400, 250, 150],
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
import TopBar from "../components/TopBar"

const RiskManagementFinal = () => {
  const navigate = useNavigate()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [metrics, setMetrics] = useState({ totalAssessments: 0, totalRisks: 0, topRisks: [] })
  const [assessments, setAssessments] = useState([])

  useEffect(() => {
    getDashboard()
      .then((res) =>
        setMetrics({
          totalAssessments: res?.data?.totalAssessments ?? res?.totalAssessments ?? 0,
          totalRisks: res?.data?.totalRisks ?? res?.totalRisks ?? 0,
          topRisks: res?.data?.topRisks ?? res?.topRisks ?? [],
        }),
      )
      .catch((e) => console.error("[v0] dashboard error:", e.message))

    listAssessments({ page: 1, limit: itemsPerPage })
      .then((res) => setAssessments(res?.data?.items || res?.data || res?.assessments || []))
      .catch((e) => console.error("[v0] assessments list error:", e.message))
  }, [itemsPerPage])

  const handleNewAssessment = () => navigate("/risk-management-chat")
  const handleDownload = async () => {
    const id = typeof window !== "undefined" ? localStorage.getItem("assessmentId") : null
    if (!id) return alert("No assessment selected")
    await downloadAssessmentReport(id)
  }

  const getBadgeClass = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "badge-high"
      case "low":
        return "badge-low"
      case "mid":
        return "badge-mid"
      default:
        return "badge-mid"
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
      `}</style>

      <main className="main">
        <Sidebar />

        <div className="main2">
          <TopBar />

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
                      <div className="metric-value">{metrics.totalAssessments}</div>
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
                      <div className="metric-value">{metrics.totalRisks}</div>
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
                  <div style={{ backgroundImage: "linear-gradient(#00c6a7, #1e4d92)" }}>
                    <canvas id="statsChart" height="100"></canvas>
                  </div>
                </div>
                <div className="col-md-4">
                  <h6>Top 5 High-Severity Risk</h6>
                  <ul className="top-risk-list">
                    {metrics.topRisks.map((risk, index) => (
                      <li key={index}>
                        {risk.title} <span className={getBadgeClass(risk.severity)}>{risk.severity}</span>
                      </li>
                    ))}
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
                    {assessments.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td>{item.lastUpdated}</td>
                        <td>
                          <span className={getBadgeClass(item.system)}>{item.system}</span>
                        </td>
                      </tr>
                    ))}
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
                  1-10 of 200 items
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
                new Chart(ctx.getContext('2d'), {
                  type: 'bar',
                  data: {
                    labels: Array(10).fill(''),
                    datasets: [{
                      data: [150, 80, 300, 100, 500, 450, 350, 400, 250, 150],
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
