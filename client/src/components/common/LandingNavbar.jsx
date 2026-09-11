import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Building2,
  LogIn,
  UserPlus,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Search,
  ShieldCheck
} from 'lucide-react';

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="public-navbar landing-navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link
          to="/"
          className="nav-brand"
          onClick={() => setMobileMenuOpen(false)}
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

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-menu">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/businesses"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <span>Directory</span>
                <span
                  style={{
                    marginLeft: '0.35rem',
                    fontSize: '0.7rem',
                    background: 'var(--primary-subtle)',
                    color: 'var(--primary)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                  }}
                >
                  Explore
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Desktop Actions (Sign In & Get Started) */}
        <div className="nav-actions">
          <div className="landing-auth-buttons">
            <Link to="/login" className="btn btn-secondary btn-sm" id="landing-nav-login">
              <LogIn size={15} />
              <span>Sign In</span>
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm" id="landing-nav-register">
              <UserPlus size={15} />
              <span>Create Account</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer for Landing Page */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-links">
            <NavLink
              to="/"
              className="mobile-nav-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/businesses"
              className="mobile-nav-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              Directory Listings
            </NavLink>
            <NavLink
              to="/about"
              className="mobile-nav-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              About BRE Services
            </NavLink>
            <NavLink
              to="/contact"
              className="mobile-nav-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Support
            </NavLink>
          </div>

          <div className="mobile-nav-actions">
            <Link
              to="/login"
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </Link>
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserPlus size={16} />
              <span>Create Free Account</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
