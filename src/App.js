import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import AICompliance from "./pages/AICompliance";

import AuditComplianceStep1 from "./pages/AuditComplianceStep1";
import AuditComplianceStep2 from "./pages/AuditComplianceStep2";
import AuditComplianceStep3 from "./pages/AuditComplianceStep3";
import AuditComplianceStep4 from "./pages/AuditComplianceStep4";
import AIGovernanceComplianceStep1 from "./pages/AIGovernanceComplianceStep1";
import AIGovernanceComplianceStep2 from "./pages/AIGovernanceComplianceStep2";
import AIGovernanceComplianceStep3 from "./pages/AIGovernanceComplianceStep3";
import AIGovernanceComplianceStep4 from "./pages/AIGovernanceComplianceStep4";
import AuditDetail from "./pages/AuditDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import Terms from "./pages/Terms";
import Signup from "./pages/Signup";
import RiskManagementStep3 from "./pages/RiskManagementStep3";
import RiskManagementStep2 from "./pages/RiskManagementStep2";
import RiskManagementFinal from "./pages/RiskManagementFinal";
import RiskManagementChat from "./pages/RiskManagementChat";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import AccountSettings from "./pages/AccountSettings";
import CoinManagement from "./pages/coin-management";
import Buycoin from "./pages/Buycoin";
import PricingPlans from "./pages/PricingPlans";
import RiskManagement from "./pages/RiskManagement";
import Wallet from "./pages/Wallet";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          {/* <Route
            path="/register"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          /> */}
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<Terms />} />

          <Route
            path="/ai-compliance"
            element={
              <ProtectedRoute>
                <AICompliance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/audit-compliance-step1"
            element={
              <ProtectedRoute>
                <AuditComplianceStep1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-compliance-step2"
            element={
              <ProtectedRoute>
                <AuditComplianceStep2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-compliance-step3"
            element={
              <ProtectedRoute>
                <AuditComplianceStep3 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-compliance-step4"
            element={
              <ProtectedRoute>
                <AuditComplianceStep4 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-detail/:auditId"
            element={
              <ProtectedRoute>
                <AuditDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-governance-compliance-step1"
            element={
              <ProtectedRoute>
                <AIGovernanceComplianceStep1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-governance-compliance-step2"
            element={
              <ProtectedRoute>
                <AIGovernanceComplianceStep2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-governance-compliance-step3"
            element={
              <ProtectedRoute>
                <AIGovernanceComplianceStep3 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-governance-compliance-step4"
            element={
              <ProtectedRoute>
                <AIGovernanceComplianceStep4 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/risk-management-step3"
            element={
              <ProtectedRoute>
                <RiskManagementStep3 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/risk-management-chat"
            element={
              <ProtectedRoute>
                <RiskManagementChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/risk-management"
            element={
              <ProtectedRoute>
                <RiskManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/risk-management-step2"
            element={
              <ProtectedRoute>
                <RiskManagementStep2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account-settings"
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buy-coin"
            element={
              <ProtectedRoute>
                <Buycoin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coin-management"
            element={
              <ProtectedRoute>
                <CoinManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plans"
            element={
              <ProtectedRoute>
                <PricingPlans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/risk-management-final"
            element={
              <ProtectedRoute>
                <RiskManagementFinal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
