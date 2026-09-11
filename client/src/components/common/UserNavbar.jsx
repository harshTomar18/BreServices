import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2,
  Search,
  LogOut,
  Menu,
  X,
  User,
  LayoutGrid,
  Building,
  Sparkles,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function UserNavbar() {
  const [navSearch, setNavSearch] = useState('');
  const { currentUser, logoutUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchActive = Boolean(
    location.pathname === '/businesses' &&
      (location.search.includes('search=') || navSearch)
  );

  const handleBottomSearchClick = () => {
    if (location.pathname === '/businesses') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        const input = document.querySelector('.top-search-input');
        if (input) {
          input.focus();
          input.select();
        }
      }, 150);
    } else {
      navigate('/businesses');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const input = document.querySelector('.top-search-input');
        if (input) input.focus();
      }, 250);
    }
  };

  // Sync navSearch with URL query param if on /businesses
  useEffect(() => {
    if (location.pathname.startsWith('/businesses')) {
      const searchParams = new URLSearchParams(location.search);
      setNavSearch(searchParams.get('search') || '');
    }
  }, [location.pathname, location.search]);

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/businesses?search=${encodeURIComponent(navSearch.trim())}`);
      setMobileMenuOpen(false);
    } else {
      navigate('/businesses');
    }
  };

  const handleNavSearchChange = (e) => {
    const val = e.target.value;
    setNavSearch(val);

    // If user is on /businesses and backspaces to clear search input, immediately show all!
    if (!val.trim() && location.pathname.startsWith('/businesses')) {
      const next = new URLSearchParams(location.search);
      next.delete('search');
      next.set('page', '1');
      const qs = next.toString();
      navigate(qs ? `/businesses?${qs}` : '/businesses', { replace: true });
    }
  };

  const handleNavClear = () => {
    setNavSearch('');
    if (location.pathname.startsWith('/businesses')) {
      const next = new URLSearchParams(location.search);
      next.delete('search');
      next.set('page', '1');
      const qs = next.toString();
      navigate(qs ? `/businesses?${qs}` : '/businesses', { replace: true });
    }
  };

  const handleLogout = () => {
    logoutUser();
    addToast('You have been securely signed out.', 'info');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const userInitial = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U';
  const displayName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Member';

  return (
    <header className="public-navbar user-navbar">
      <div className="container navbar-container">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          className="nav-brand"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="BRE Services Home"
        >
          <div className="brand-icon" style={{ background: 'var(--primary)' }}>
            <Building2 size={22} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                BRE Services
              </span>
              {/* <span className="user-nav-badge">
                Directory
              </span> */}
            </div>
            {/* <span style={{ fontSize: '0.68rem', color: 'var(--success)', fontWeight: 600, letterSpacing: '0.02em' }}>
              ● Verified Portal
            </span> */}
          </div>
        </Link>

        {/* Center: Search Bar */}
        <form onSubmit={handleNavSearch} className="nav-quick-search">
          <Search size={16} className="nav-quick-search-icon" />
          <input
            type="text"
            placeholder="Search businesses, categories..."
            value={navSearch}
            onChange={handleNavSearchChange}
            className="nav-quick-search-input"
          />
          {navSearch && (
            <button
              type="button"
              className="nav-quick-search-clear"
              onClick={handleNavClear}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </form>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Member Navigation">
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
                <Building size={16} style={{ marginRight: '0.25rem' }} />
                <span>Businesses</span>
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

        {/* Right Actions: User Profile Pill & Sign Out */}
        <div className="nav-actions">
          {/* User Profile Pill */}
          <div className="user-profile-pill">
            <div className="user-avatar-circle">
              {userInitial}
            </div>
            <div className="user-details-text">
              <span className="user-display-name">{displayName}</span>
              <span className="user-role-label">BRE Member</span>
            </div>
          </div>

          {/* Sign Out Button (Desktop) */}
          <button
            onClick={handleLogout}
            className="btn btn-secondary btn-sm user-logout-btn"
            title="Sign out of BRE Services"
          >
            <LogOut size={15} />
            <span className="hide-on-mobile-sm">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Mobile App-Style Bottom Navigation Bar (Home, Businesses, Search, Logout) */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mobile-bottom-tab ${isActive ? 'active' : ''}`
          }
          end
        >
          <Home size={20} className="bottom-tab-icon" />
          <span className="bottom-tab-label">Home</span>
        </NavLink>

        <NavLink
          to="/businesses"
          className={({ isActive }) =>
            `mobile-bottom-tab ${isActive ? 'active' : ''}`
          }
        >
          <Building2 size={20} className="bottom-tab-icon" />
          <span className="bottom-tab-label">Businesses</span>
        </NavLink>

        <button
          type="button"
          onClick={handleBottomSearchClick}
          className={`mobile-bottom-tab ${isSearchActive ? 'active' : ''}`}
          aria-label="Search directory"
        >
          <Search size={20} className="bottom-tab-icon" />
          <span className="bottom-tab-label">Search</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="mobile-bottom-tab logout-tab"
          aria-label="Sign out"
        >
          <LogOut size={20} className="bottom-tab-icon" />
          <span className="bottom-tab-label">Logout</span>
        </button>
      </nav>
    </header>
  );
}
