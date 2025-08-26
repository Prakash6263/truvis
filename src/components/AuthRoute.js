import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../utils/auth"

const AuthRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/ai-compliance" replace /> : children
}

export default AuthRoute
