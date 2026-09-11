import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchHealth } from '../services/api';

export default function HomePage() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkConnection = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchHealth();
      setHealth(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-pill">
          <span>🚀</span> Enterprise Stack Initialized
        </div>
        <h1 className="hero-title">
          Modern Full-Stack <br />
          <span className="gradient-text">React + Node.js + MongoDB</span>
        </h1>
        <p className="hero-subtitle">
          Engineered with an enterprise-grade modular architecture. Decoupled client and server, 
          centralized error management, robust RESTful APIs, and React Router v7 navigation.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/services" className="btn btn-primary">
            Explore Services ➔
          </Link>
          <button onClick={checkConnection} className="btn btn-secondary">
            🔄 Refresh API Status
          </button>
        </div>
      </section>

      {/* Backend Live Status Card */}
      <div className="status-card">
        <div className="status-header">
          <div className="status-indicator">
            <span
              className={`pulse-dot ${health && !error ? 'online' : 'offline'}`}
            ></span>
            <span>
              Backend Gateway Status:{' '}
              {loading ? 'Checking...' : error ? 'Disconnected' : 'Online & Active'}
            </span>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Target: Express (Port 5000)
          </span>
        </div>

        <div className="status-grid">
          <div className="status-item">
            <div className="status-item-label">API Service</div>
            <div className="status-item-value">
              {health?.service || (error ? 'Unavailable' : 'Connecting...')}
            </div>
          </div>

          <div className="status-item">
            <div className="status-item-label">Environment</div>
            <div className="status-item-value">
              {health?.environment || (error ? 'Offline' : '...')}
            </div>
          </div>

          <div className="status-item">
            <div className="status-item-label">MongoDB Driver</div>
            <div className="status-item-value" style={{ color: health?.database?.status === 'connected' ? 'var(--success)' : 'var(--warning)' }}>
              {health ? health.database.status.toUpperCase() : error ? 'N/A' : '...'}
            </div>
          </div>

          <div className="status-item">
            <div className="status-item-label">Server Uptime</div>
            <div className="status-item-value">
              {health ? `${Math.floor(health.uptime)}s` : error ? '0s' : '...'}
            </div>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#fca5a5' }}>
            <strong>Note:</strong> Express backend is currently offline or unreachable. Run <code>npm run dev</code> from root to launch both server and client.
          </div>
        )}
      </div>

      {/* Features & Architecture Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3 className="feature-title">Frontend Architecture</h3>
          <p className="feature-desc">
            Vite 6 with React 19, React Router v7 layout structure, proxy-configured dev server, and CSS design system.
          </p>
          <div className="arch-pill-list">
            <span className="arch-pill">React 19</span>
            <span className="arch-pill">Vite</span>
            <span className="arch-pill">React Router DOM</span>
            <span className="arch-pill">Glassmorphic UI</span>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3 className="feature-title">Backend Architecture</h3>
          <p className="feature-desc">
            Layered Express architecture with dedicated controllers, routes, Mongoose models, and standardized <code>ApiResponse</code> and <code>ApiError</code> wrappers.
          </p>
          <div className="arch-pill-list">
            <span className="arch-pill">Node.js</span>
            <span className="arch-pill">Express</span>
            <span className="arch-pill">MongoDB & Mongoose</span>
            <span className="arch-pill">Morgan Logger</span>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📦</div>
          <h3 className="feature-title">Monorepo Orchestration</h3>
          <p className="feature-desc">
            Decoupled <code>client/</code> and <code>server/</code> packages unified by root npm scripts with concurrent execution.
          </p>
          <div className="arch-pill-list">
            <span className="arch-pill">npm run dev</span>
            <span className="arch-pill">Concurrently</span>
            <span className="arch-pill">Vite API Proxy</span>
            <span className="arch-pill">ES Modules</span>
          </div>
        </div>
      </div>
    </div>
  );
}
