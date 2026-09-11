import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <h1 style={{ fontSize: '5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The route you requested does not exist in this application.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
}
