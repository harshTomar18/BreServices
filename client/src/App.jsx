import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/public/HomePage';
import DirectoryPage from './pages/public/DirectoryPage';
import BusinessDetailPage from './pages/public/BusinessDetailPage';
import CategoryPage from './pages/public/CategoryPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import BusinessesPage from './pages/admin/BusinessesPage';
import BusinessFormPage from './pages/admin/BusinessFormPage';
import CategoriesPage from './pages/admin/CategoriesPage';

import { useAuth } from './context/AuthContext';

function RootRoute() {
  const { isUserAuthenticated, isAdminAuthenticated } = useAuth();

  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (isUserAuthenticated) {
    return <Navigate to="/businesses" replace />;
  }
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Flow */}
        <Route element={<PublicLayout />}>
          {/* Direct entry: Opens login page if not logged in, or directory if logged in */}
          <Route path="/" element={<RootRoute />} />
          <Route path="/home" element={<HomePage />} />

          {/* User Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Directory Routes (Unlocked after login) */}
          <Route
            path="/businesses"
            element={
              <ProtectedRoute>
                <DirectoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/business/:id"
            element={
              <ProtectedRoute>
                <BusinessDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:category"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />

          {/* General Information Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin Login (Isolated) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Console Flow */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="businesses" element={<BusinessesPage />} />
          <Route path="businesses/add" element={<BusinessFormPage />} />
          <Route path="businesses/:id/edit" element={<BusinessFormPage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>

        {/* Catch-all 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
