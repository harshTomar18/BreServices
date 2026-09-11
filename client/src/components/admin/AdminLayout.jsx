import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { isAuthenticated, isAdminAuthenticated, currentUser, adminUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hasAdminAccess = Boolean(
    isAuthenticated ||
    isAdminAuthenticated ||
    adminUser ||
    currentUser?.role === 'admin' ||
    currentUser?.email === 'admin@bre.com'
  );

  // If a regular user tries to access the admin side, block them and send back to user side
  if (currentUser && !hasAdminAccess) {
    return <Navigate to="/businesses" replace />;
  }

  // If not authenticated as admin at all, send to admin login
  if (!hasAdminAccess) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-shell">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-main-wrapper">
        <AdminNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
