import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from "./pages/About"
import AICompliance from "./pages/AICompliance"
import AuditCompliance from "./pages/AuditCompliance"
import AuditComplianceStep1 from "./pages/AuditComplianceStep1"
import AuditComplianceStep2 from "./pages/AuditComplianceStep2"
import AuditComplianceStep3 from "./pages/AuditComplianceStep3"
import AuditComplianceStep4 from "./pages/AuditComplianceStep4"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Chat from "./pages/Chat"
import Privacy from "./pages/Privacy"
import Disclaimer from "./pages/Disclaimer"
import Terms from "./pages/Terms"
import Signup from "./pages/Signup"
import RiskManagementStep3 from "./pages/RiskManagementStep3"
import RiskManagementStep2 from "./pages/RiskManagementStep2"
import RiskManagementFinal from "./pages/RiskManagementFinal"
import RiskManagementChat from "./pages/RiskManagementChat"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ai-compliance" element={<AICompliance />} />
          <Route path="/audit-compliance" element={<AuditCompliance />} />
          <Route path="/audit-compliance-step1" element={<AuditComplianceStep1 />} />
          <Route path="/audit-compliance-step2" element={<AuditComplianceStep2 />} />
          <Route path="/audit-compliance-step3" element={<AuditComplianceStep3 />} />
          <Route path="/audit-compliance-step4" element={<AuditComplianceStep4 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/risk-management-step3" element={<RiskManagementStep3 />} />
          <Route path="/risk-management-chat" element={<RiskManagementChat />} />
          <Route path="/risk-management-step2" element={<RiskManagementStep2 />} />
          <Route path="/risk-management-final" element={<RiskManagementFinal />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
