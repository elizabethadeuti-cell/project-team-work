import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // adjust path to match your project

function ProtectedRoute({ children }) {
  const { user, authloading } = useAuth();
  const location = useLocation();

  if (authloading) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;