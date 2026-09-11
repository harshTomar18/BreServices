import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand-logo">
          <span>⚡ BRE_SERVICES</span>
          <span className="brand-badge">Full-Stack MERN</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Services
          </NavLink>
          <a
            href="/api/v1/health"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            API Health ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
