import { Link } from 'react-router-dom';
import { Building2, LogIn, UserPlus } from 'lucide-react';

export default function LandingNavbar() {
  return (
    <header className="public-navbar landing-navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link
          to="/"
          className="nav-brand"
          aria-label="BRE Services Home"
        >
          <div className="brand-icon">
            <Building2 size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              BRE Services
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Business Directory
            </span>
          </div>
        </Link>

        {/* Action Buttons (Sign In & Create Account) */}
        <div className="nav-actions">
          <div className="landing-auth-buttons" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Link to="/login" className="btn btn-secondary btn-sm" id="landing-nav-login">
              <LogIn size={15} />
              <span>Sign In</span>
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm" id="landing-nav-register">
              <UserPlus size={15} />
              <span>Create Account</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
