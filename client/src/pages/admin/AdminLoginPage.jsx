import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, loading, isAdminAuthenticated, isUserAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // If already authenticated as admin, go straight to admin dashboard
  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If already authenticated as regular user, regular users cannot access admin login
  if (isUserAuthenticated) {
    return <Navigate to="/businesses" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      addToast('Login successful! Welcome back, Admin.', 'success');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    addToast('Password reset instructions sent to administrator email.', 'info');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-page)',
        padding: '1.5rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Public Directory</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="form-card" style={{ maxWidth: '100%', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <ShieldCheck size={28} />
            </div>
            <h1 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>Admin Portal</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Sign in with administrative credentials to manage directory listings.
            </p>
          </div>

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--danger-bg)',
                border: '1px solid var(--danger-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--danger)',
                fontSize: '0.88rem',
                marginBottom: '1.5rem',
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Admin Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bre.com"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <a
                  href="#forgot"
                  onClick={handleForgotPassword}
                  style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}
                >
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              {loading ? 'Authenticating...' : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div
            onClick={() => {
              setEmail('admin@bre.com');
              setPassword('admin123');
            }}
            style={{
              marginTop: '1.25rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(37, 99, 235, 0.06)',
              border: '1px dashed rgba(37, 99, 235, 0.3)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'background-color 0.15s ease',
            }}
            title="Click to auto-fill admin credentials"
          >
            <span style={{ fontWeight: 600, color: 'var(--primary)', display: 'block', marginBottom: '0.2rem' }}>
              🔑 Admin Credentials (Click to Auto-fill):
            </span>
            <span><strong>Email:</strong> admin@bre.com</span> &bull; <span><strong>Password:</strong> admin123</span>
          </div>
        </div>
      </div>

    </div>
  );
}
