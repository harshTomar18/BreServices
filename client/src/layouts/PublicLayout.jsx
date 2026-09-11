import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function PublicLayout() {
  const { isAdminAuthenticated } = useAuth();

  // Admin cannot go to the user side
  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="public-layout">
      <Navbar />
      <main className="public-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

