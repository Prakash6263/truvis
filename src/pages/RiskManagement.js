
// import { Link, useNavigate } from "react-router-dom"
// import { useState } from "react"
// import { createAssessment } from "../api/risk"
// import Swal from "sweetalert2"

// const RiskManagement = () => {
//   const navigate = useNavigate()
//   const [systemName, setSystemName] = useState("")
//   const [businessFunction, setBusinessFunction] = useState("")
//   const [technicalFunction, setTechnicalFunction] = useState("")
//   const [useCases, setUseCases] = useState("")
//   const [additionalInfo, setAdditionalInfo] = useState("")
//   const [files, setFiles] = useState([])

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     if (!systemName || !systemName.trim()) {
//       return Swal.fire({
//         icon: "warning",
//         title: "System Name required",
//         text: "Please enter a System Name. It will be used as the assessment title.",
//       })
//     }
//     try {
//       const payload = {
//         title: systemName?.trim(),
//         systemName,
//         businessFunction,
//         technicalFunction,
//         useCases,
//         additionalInfo,
//       }

//       Swal.fire({
//         title: "Creating assessment...",
//         allowOutsideClick: false,
//         didOpen: () => Swal.showLoading(),
//       })

//       const res = await createAssessment(payload, files)
//       const scopeId = res?.scope_id || res?.id || res?.data?.response?.scope_id

//       if (!scopeId) {
//         Swal.close()
//         throw new Error("Missing scope ID from API response")
//       }

//       if (typeof window !== "undefined") {
//         localStorage.setItem("assessmentId", scopeId)
//         localStorage.setItem("scopeId", scopeId)
//       }

//       await Swal.fire({
//         icon: "success",
//         title: "Assessment created",
//         text: "Proceeding to clarifications...",
//         timer: 1200,
//         showConfirmButton: false,
//       })

//       navigate("/risk-management-step2")
//     } catch (err) {
//       console.error("[v0] Step1 error:", err?.message)
//       Swal.fire({ icon: "error", title: "Failed to create", text: err?.message || "Please try again" })
//     }
//   }

//   return (
//     <>
//       {/* preloader */}
//       {/* <div className="preloader">
//         <div className="loader-ripple">
//           <div />
//           <div />
//         </div>
//       </div> */}
//       {/* preloader end */}
//       <style
//         dangerouslySetInnerHTML={{
//           __html:
//             "\n    :root {\n      --bg-light: #ffffff;\n      --bg-dark: #121212;\n      --text-light: #000;\n      --text-dark: #fff;\n      --accent: #3AC6BD;\n      --sidebar-width: 300px;\n      --card-bg: #f9f9f9;\n      --border-color: #eee;\n    }\n\n    body {\n      font-family: 'Segoe UI', sans-serif;\n      margin: 0;\n      background-color: var(--bg-light);\n      color: var(--text-light);\n      transition: all 0.3s ease;\n    }\n\n    \n  ",
//         }}
//       />
//       <main className="main">
//         {/* Sidebar */}
//         <div className="sidebar" id="sidebar">
//           <div className="logo">
//             <img src="assets/img/logo/logo.png" alt="logo" />
//           </div>
//           <div className="d-flex justify-content-between">
//             <button className="theme-btn mb-3 w-100 btn btn-primary me-2">+ New Chat</button>
//             <a>
//               <img src="assets/img/search.png" />
//             </a>
//           </div>
//           <ul className="chat-list">
//             <li>
//               <img src="assets/img/chaticon.png" style={{ width: 20, marginRight: 10 }} /> What is posh policy?
//             </li>
//             <li>
//               <img src="assets/img/chaticon.png" style={{ width: 20, marginRight: 10 }} /> What is sandwich rule?
//             </li>
//             <li className="active">
//               <img src="assets/img/chaticon.png" style={{ width: 20, marginRight: 10 }} /> Salary date?{" "}
//               <span className="trashed">
//                 <i className="fa fa-trash text-white" />
//               </span>
//             </li>
//           </ul>
//           <div className="mt-4 text-muted small">Yesterday</div>
//           <ul className="chat-list">
//             <li>
//               <img src="assets/img/chaticon.png" style={{ width: 20, marginRight: 10 }} /> What's in your mind?
//             </li>
//             <li>
//               <img src="assets/img/chaticon.png" style={{ width: 20, marginRight: 10 }} /> What's in your mind?
//             </li>
//             <li>
//               <img src="assets/img/chaticon.png" style={{ width: 20, marginRight: 10 }} /> What's in your mind?
//             </li>
//           </ul>
//           <a href="login.html" className="btn logout-btn mt-4">
//             <i className="fas fa-sign-out-alt me-2" /> Log Out
//           </a>
//         </div>
//         {/* Main Area */}
//         <div className="main2">
//           <div className="topbar mb-3">
//             <div>
//               <button className="btn btn-toggle-sidebar w-auto" id="sidebarToggle">
//                 <i className="fas fa-bars" />
//               </button>
//             </div>
//             <div className="right w-auto">
//               <button className="coin theme-btn">50 Coin</button>
//               <i className="fas fa-bell icon" />
//               <img src="assets/img/Avatar.png" className="rounded-circle" alt="User" />
//               <button className="btn btn-sm btn-outline-dark" id="modeToggle">
//                 🌓
//               </button>
//             </div>
//           </div>
//           <div className="middle">
//             {/* Step Header */}
//             <div className="container text-center">
//               <div className="d-flex justify-content-between align-items-center mt-5">
//                 <Link className="btn-nav" to="/risk-management-chat">
//                   ← Back
//                 </Link>
//                 <div>
//                   <div className="step-header">Step 1 of 4: Define Scope</div>
//                   <div className="progress-indicator">
//                     <div className="progress-bar-custom">
//                       <div className="progress-bar-fill" />
//                     </div>
//                   </div>
//                 </div>
//                 <Link
//                   className="btn-nav"
//                   to="#"
//                   onClick={(e) => {
//                     e.preventDefault()
//                     const id = typeof window !== "undefined" ? localStorage.getItem("assessmentId") : null
//                     if (id) return navigate("/risk-management-step2")
//                     Swal.fire({
//                       icon: "info",
//                       title: "Create assessment first",
//                       text: "Please fill the form and click Submit to generate an assessment id.",
//                     })
//                   }}
//                 >
//                   Next →
//                 </Link>
//               </div>
//             </div>
//             {/* Form Card */}
//             <div className="form-card">
//               {/* System Overview */}
//               <div className="section-title text-dark">System Overview</div>
//               <div className="subtext">This section provides a high-level summary of the system being assessed...</div>
//               {/* Add System Details */}
//               <div className="section-title mb-3 text-dark">Add System Details</div>
//               <form onSubmit={onSubmit}>
//                 <div className="mb-3">
//                   <label className="form-label">System Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="e.g., Customer Data Platform"
//                     value={systemName}
//                     onChange={(e) => setSystemName(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">System Business Function</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="e.g., Manages customer profiles and interactions"
//                     value={businessFunction}
//                     onChange={(e) => setBusinessFunction(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">System Technical Function</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="e.g., Data ingestion, processing, and API serving"
//                     value={technicalFunction}
//                     onChange={(e) => setTechnicalFunction(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">System Use Cases</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="e.g., Customer onboarding, marketing segmentation..."
//                     value={useCases}
//                     onChange={(e) => setUseCases(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="form-label">Additional System Information</label>
//                   <textarea
//                     className="form-control"
//                     rows={3}
//                     value={additionalInfo}
//                     onChange={(e) => setAdditionalInfo(e.target.value)}
//                   />
//                 </div>
//                 {/* Upload System Documentation */}
//                 <div className="section-title mb-3 text-dark">Upload System Documentation</div>
//                 <div className="mb-3">
//                   <label className="btn btn-outline-secondary theme-btn">
//                     Browse Files{" "}
//                     <input type="file" style={{ display: "none" }} onChange={(e) => setFiles(e.target.files)} />
//                   </label>
//                 </div>
//                 <div className="upload-box">
//                   Drag and drop your files here, or click to browse
//                   <br />
//                   <i className="fa fa-folder-o mt-2" style={{ fontSize: 36 }} />
//                 </div>
//                 <div className="file-name text-dark">
//                   {files.length > 0 && (
//                     <>
//                       <i className="fas fa-file-pdf me-2 text-danger" />
//                       {files[0].name} &nbsp; • &nbsp; {(files[0].size / 1024).toFixed(1)} KB &nbsp; • &nbsp;
//                       {files[0].type.split("/")[1]}
//                     </>
//                   )}
//                 </div>
//                 {/* Submit Buttons */}
//                 <div className="text-center mt-5">
//                   <div>
//                     <button
//                       className="btn btn-outline-secondary btn-nav me-2"
//                       type="button"
//                       onClick={() => navigate("/")}
//                     >
//                       Cancel
//                     </button>
//                     <button className="btn btn-success btn-nav" type="submit">
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         {/* JS */}
//       </main>
//       {/* js */}
//       {/* JavaScript */}
//     </>
//   )
// }

// export default RiskManagement




"use client"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { createAssessment } from "../api/risk"
import Swal from "sweetalert2"
import Sidebar from "../components/Sidebar"

const RiskManagement = () => {
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [currentChatId, setCurrentChatId] = useState(null)
  const [sidebarRefreshTrigger, setSidebarRefreshTrigger] = useState(0)
  const roleModule = "risk"

  const [systemName, setSystemName] = useState("")
  const [businessFunction, setBusinessFunction] = useState("")
  const [technicalFunction, setTechnicalFunction] = useState("")
  const [useCases, setUseCases] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [files, setFiles] = useState([])

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

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!systemName || !systemName.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "System Name required",
        text: "Please enter a System Name. It will be used as the assessment title.",
      })
    }
    try {
      const payload = {
        title: systemName?.trim(),
        systemName,
        businessFunction,
        technicalFunction,
        useCases,
        additionalInfo,
      }

      Swal.fire({
        title: "Creating assessment...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      })

      const res = await createAssessment(payload, files)
      const scopeId = res?.scope_id || res?.id || res?.data?.response?.scope_id

      if (!scopeId) {
        Swal.close()
        throw new Error("Missing scope ID from API response")
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("assessmentId", scopeId)
        localStorage.setItem("scopeId", scopeId)
      }

      await Swal.fire({
        icon: "success",
        title: "Assessment created",
        text: "Proceeding to clarifications...",
        timer: 1200,
        showConfirmButton: false,
      })

      navigate("/risk-management-step2")
    } catch (err) {
      console.error("[v0] Step1 error:", err?.message)
      Swal.fire({ icon: "error", title: "Failed to create", text: err?.message || "Please try again" })
    }
  }

  return (
    <>
      {/* preloader */}
      {/* <div className="preloader">
        <div className="loader-ripple">
          <div />
          <div />
        </div>
      </div> */}
      {/* preloader end */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    :root {\n      --bg-light: #ffffff;\n      --bg-dark: #121212;\n      --text-light: #000;\n      --text-dark: #fff;\n      --accent: #3AC6BD;\n      --sidebar-width: 300px;\n      --card-bg: #f9f9f9;\n      --border-color: #eee;\n    }\n\n    body {\n      font-family: 'Segoe UI', sans-serif;\n      margin: 0;\n      background-color: var(--bg-light);\n      color: var(--text-light);\n      transition: all 0.3s ease;\n    }\n\n    \n  ",
        }}
      />
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
                <Link className="btn-nav" to="/risk-management-chat">
                  ← Back
                </Link>
                <div>
                  <div className="step-header">Step 1 of 4: Define Scope</div>
                  <div className="progress-indicator">
                    <div className="progress-bar-custom">
                      <div className="progress-bar-fill" />
                    </div>
                  </div>
                </div>
                <Link
                  className="btn-nav"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault()
                    const id = typeof window !== "undefined" ? localStorage.getItem("assessmentId") : null
                    if (id) return navigate("/risk-management-step2")
                    Swal.fire({
                      icon: "info",
                      title: "Create assessment first",
                      text: "Please fill the form and click Submit to generate an assessment id.",
                    })
                  }}
                >
                  Next →
                </Link>
              </div>
            </div>
            <div className="form-card">
              <div className="section-title text-dark">System Overview</div>
              <div className="subtext">This section provides a high-level summary of the system being assessed...</div>
              <div className="section-title mb-3 text-dark">Add System Details</div>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">System Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Customer Data Platform"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">System Business Function</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Manages customer profiles and interactions"
                    value={businessFunction}
                    onChange={(e) => setBusinessFunction(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">System Technical Function</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Data ingestion, processing, and API serving"
                    value={technicalFunction}
                    onChange={(e) => setTechnicalFunction(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">System Use Cases</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Customer onboarding, marketing segmentation..."
                    value={useCases}
                    onChange={(e) => setUseCases(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Additional System Information</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </div>
                <div className="section-title mb-3 text-dark">Upload System Documentation</div>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary theme-btn">
                    Browse Files{" "}
                    <input type="file" style={{ display: "none" }} onChange={(e) => setFiles(e.target.files)} />
                  </label>
                </div>
                <div className="upload-box">
                  Drag and drop your files here, or click to browse
                  <br />
                  <i className="fa fa-folder-o mt-2" style={{ fontSize: 36 }} />
                </div>
                <div className="file-name text-dark">
                  {files.length > 0 && (
                    <>
                      <i className="fas fa-file-pdf me-2 text-danger" />
                      {files[0].name} &nbsp; • &nbsp; {(files[0].size / 1024).toFixed(1)} KB &nbsp; • &nbsp;
                      {files[0].type.split("/")[1]}
                    </>
                  )}
                </div>
                <div className="text-center mt-5">
                  <div>
                    <button
                      className="btn btn-outline-secondary btn-nav me-2"
                      type="button"
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-success btn-nav" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default RiskManagement
