import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { useDirectory } from '../../context/DirectoryContext';

export default function Footer() {
  const { categories } = useDirectory();

  return (
    <footer className="public-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div>
            <Link to="/" className="nav-brand" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <div className="brand-icon">
                <Building2 size={20} />
              </div>
              <span>BRE Services</span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '320px' }}>
              Discover verified local businesses, expert IT services, trusted healthcare, dining, and professional corporate consultancies in your city.
            </p>
            {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} /> 100 Innovation Blvd, Silicon Valley, CA
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={15} /> +1 (800) 555-BIZZ
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} /> contact@breservices.com
              </span>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/businesses" className="footer-link">All Businesses</Link></li>
              {/* <li><Link to="/about" className="footer-link">About Directory</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li> */}
            </ul>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="footer-title">Top Categories</h4>
            <ul className="footer-links">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/businesses?category=${encodeURIComponent(cat.name)}`} className="footer-link">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Administration */}
          <div>
            <h4 className="footer-title">Directory Standards</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
              Every listing is curated and verified by our administrative editorial board to guarantee accurate business contact details and addresses.
            </p>
            {/* <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              🔒 Public users browse freely. Verified business profiles.
            </div> */}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} BRE Services Platform. All rights reserved.
          </div>
          {/* <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/about" className="footer-link">Privacy Policy</Link>
            <Link to="/about" className="footer-link">Terms of Service</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
