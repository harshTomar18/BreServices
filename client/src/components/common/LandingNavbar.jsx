import { Link } from 'react-router-dom';
import { Building2, LogIn, UserPlus } from 'lucide-react';

export default function LandingNavbar() {
  return (
    <header className="public-navbar landing-navbar">
      <div className="container navbar-container landing-navbar-container">
        {/* Brand Logo */}
        <Link
          to="/"
          className="nav-brand landing-nav-brand"
          aria-label="BRE Services Home"
        >
          <div className="brand-icon landing-brand-icon">
            <Building2 size={20} />
          </div>
          <div className="landing-brand-text">
            <span className="landing-brand-title">
              BRE Services
            </span>
            <span className="landing-brand-subtitle">
              Business Directory
            </span>
          </div>
        </Link>

        {/* Action Buttons (Sign In & Create Account) */}
        <div className="nav-actions landing-nav-actions">
          <Link to="/login" className="btn btn-secondary btn-sm landing-btn-login" id="landing-nav-login">
            <LogIn size={15} />
            <span>Sign In</span>
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm landing-btn-register" id="landing-nav-register">
            <UserPlus size={15} />
            <span className="landing-register-full">Create Account</span>
            <span className="landing-register-short">Register</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
