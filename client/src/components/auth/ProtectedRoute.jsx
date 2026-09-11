import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isUserAuthenticated, isAdminAuthenticated } = useAuth();
  const location = useLocation();

  // Admin cannot go to the user side
  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // User must be logged in to view member pages
  if (!isUserAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

