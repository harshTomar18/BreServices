import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Star,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { loginUser, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/businesses';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      addToast(`Welcome back, ${user.name}! Access unlocked.`, 'success');

      // If user has admin role or email is admin@bre.com, redirect directly to admin dashboard
      if (user.role === 'admin' || user.email === 'admin@bre.com') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (
        err.statusCode === 404 ||
        err.message?.toLowerCase().includes('not exist') ||
        err.message?.toLowerCase().includes('not found')
      ) {
        addToast('No account found for this email. Redirecting to registration...', 'info');
        navigate('/register', {
          state: {
            email,
            message: 'No account found with this email. Please create your account to proceed.',
          },
        });
      } else if (err.message === 'Failed to fetch') {
        addToast('Server is currently offline or unreachable. Please try again.', 'error');
      } else {
        addToast(err.message || 'Login failed. Please check your credentials.', 'error');
      }
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-split-card">
        {/* Left Side: Modern Brand Showcase Panel */}
        <div className="auth-showcase-panel">
          <div>
            <Link to="/" className="auth-brand-badge">
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Building2 size={22} color="#fff" />
              </div>
              <span>BRE Services</span>
            </Link>

            <h2 className="auth-showcase-title">
              Access 12,000+ Verified Business Profiles
            </h2>

            <p className="auth-showcase-desc">
              Connect with top-rated service providers, verified corporate consultants,
              and authentic local businesses in one centralized directory.
            </p>

            <div className="auth-feature-list">
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={16} />
                </div>
                <span>Direct phone lines and physical addresses</span>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <ShieldCheck size={16} />
                </div>
                <span>100% human-verified commercial listings</span>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <Sparkles size={16} />
                </div>
                <span>Zero spam, sponsored ads, or bot reviews</span>
              </div>
            </div>
          </div>

          {/* Testimonial Box */}
          <div className="auth-testimonial-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', marginBottom: '0.5rem' }}>
              <Star size={14} fill="#fbbf24" />
              <Star size={14} fill="#fbbf24" />
              <Star size={14} fill="#fbbf24" />
              <Star size={14} fill="#fbbf24" />
              <Star size={14} fill="#fbbf24" />
            </div>
            <p className="auth-testimonial-quote">
              &ldquo;BRE Services made locating certified healthcare and IT consultants effortless. The information is always accurate.&rdquo;
            </p>
            <div className="auth-testimonial-author">
              Elena Rostova • Managing Partner at Vertex Global
            </div>
          </div>
        </div>

        {/* Right Side: Modern Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Enter your credentials to access your account and unlock the directory.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="auth-input"
                />
                <Mail size={18} className="input-icon-left" />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('Password reset link sent to registered email.', 'info');
                  }}
                  style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="input-with-icon">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="auth-input"
                  style={{ paddingRight: '2.8rem' }}
                />
                <Lock size={18} className="input-icon-left" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-icon-btn-right"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <label htmlFor="rememberMe" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="auth-btn-primary"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In &amp; Access Directory</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="auth-footer-prompt">
            Don&apos;t have an account yet?
            <Link to="/register" className="auth-footer-link">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
