import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Check,
  X,
  Eye,
  EyeOff,
  Info,
  Sparkles,
  Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function RegisterPage() {
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notice, setNotice] = useState(location.state?.message || null);

  const { registerUser, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
    if (location.state?.message) {
      setNotice(location.state.message);
    }
  }, [location.state]);

  // Live password validations
  const isMinLength = password.length >= 6;
  const isMatch = password.length > 0 && password === confirmPassword;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('Please provide your full name', 'error');
      return;
    }

    if (!isMinLength) {
      addToast('Password must be at least 6 characters long', 'error');
      return;
    }

    if (password !== confirmPassword) {
      addToast('Passwords do not match. Please re-enter.', 'error');
      return;
    }

    try {
      const user = await registerUser(name, email, password);
      addToast(`Account created successfully! Welcome, ${user.name}.`, 'success');
      navigate('/businesses');
    } catch (err) {
      const errMsg =
        err.message === 'Failed to fetch'
          ? 'Server is currently offline. Please ensure the backend is running.'
          : err.message || 'Registration failed. Please try again.';
      addToast(errMsg, 'error');
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
              Join the Trusted Commercial Directory
            </h2>

            <p className="auth-showcase-desc">
              Create your account to search verified companies, view full contact records, 
              and discover top-rated service providers across multiple cities.
            </p>

            <div className="auth-feature-list">
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={16} />
                </div>
                <span>Free account with unlimited directory access</span>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <ShieldCheck size={16} />
                </div>
                <span>Direct telephone and email contact information</span>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <Sparkles size={16} />
                </div>
                <span>Instant activation with zero spam emails</span>
              </div>
            </div>
          </div>

          {/* Social Proof Box */}
          <div className="auth-testimonial-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', marginBottom: '0.5rem' }}>
              <Star size={14} fill="#fbbf24" />
              <Star size={14} fill="#fbbf24" />
              <Star size={14} fill="#fbbf24" />
              <Star size={14} fill="#fbbf24" />
              <Star size={14} fill="#fbbf24" />
            </div>
            <p className="auth-testimonial-quote">
              &ldquo;Registering took 30 seconds, and I immediately found an enterprise IT security partner in San Francisco.&rdquo;
            </p>
            <div className="auth-testimonial-author">
              Marcus Bennett • CTO, Horizon Logistics
            </div>
          </div>
        </div>

        {/* Right Side: Modern Registration Form */}
        <div className="auth-form-panel">
          <div className="auth-header">
            <h1 className="auth-title">Create an Account</h1>
            <p className="auth-subtitle">
              Sign up today to unlock full directory profiles and search listings.
            </p>
          </div>

          {/* Redirect Notice Banner */}
          {notice && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--primary-subtle)',
                border: '1px solid var(--primary-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--primary)',
                fontSize: '0.88rem',
                marginBottom: '1.5rem',
              }}
            >
              <Info size={18} style={{ flexShrink: 0 }} />
              <span>{notice}</span>
            </div>
          )}

          <form onSubmit={handleRegister}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="auth-input"
                />
                <User size={18} className="input-icon-left" />
              </div>
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul.sharma@example.com"
                  className="auth-input"
                />
                <Mail size={18} className="input-icon-left" />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Create Password</label>
              <div className="input-with-icon">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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

            {/* Confirm Password Field */}
            <div className="form-group" style={{ marginBottom: '0.75rem' }}>
              <label className="form-label">Confirm Password</label>
              <div className="input-with-icon">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="auth-input"
                  style={{ paddingRight: '2.8rem' }}
                />
                <Lock size={18} className="input-icon-left" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="input-icon-btn-right"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Live Password Requirements Checklist */}
            <div className="password-checklist" style={{ marginBottom: '1.75rem' }}>
              <span className={`password-check-item ${isMinLength ? 'valid' : 'invalid'}`}>
                {isMinLength ? <Check size={14} /> : <X size={14} />}
                <span>At least 6 characters</span>
              </span>
              <span className={`password-check-item ${isMatch ? 'valid' : 'invalid'}`}>
                {isMatch ? <Check size={14} /> : <X size={14} />}
                <span>Passwords match</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="auth-btn-primary"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="auth-footer-prompt">
            Already have an account?
            <Link to="/login" className="auth-footer-link">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
