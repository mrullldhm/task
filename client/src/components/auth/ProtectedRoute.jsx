import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/// <summary>
/// Route guard component that ensures only authenticated users can access protected pages.
/// Redirects unauthenticated users to login page.
/// </summary>
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
