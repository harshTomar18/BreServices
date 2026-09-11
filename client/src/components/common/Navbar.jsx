import { useAuth } from '../../context/AuthContext';
import LandingNavbar from './LandingNavbar';
import UserNavbar from './UserNavbar';

/**
 * Smart Navbar Router Component
 * Renders LandingNavbar when visitor is on landing/public pages without login.
 * Renders UserNavbar with integrated directory search & member controls when authenticated.
 */
export default function Navbar() {
  const { isUserAuthenticated, isAdminAuthenticated } = useAuth();
  const isLoggedIn = isUserAuthenticated || isAdminAuthenticated;

  if (isLoggedIn) {
    return <UserNavbar />;
  }

  return <LandingNavbar />;
}
