import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      addToast('Thank you! Your message has been sent.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Get in Touch</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Have a question about a business listing, need editorial assistance, or want to suggest a category? We are here to help.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Contact Info */}
        <div>
          <div className="info-card">
            <h3 className="info-card-title">Directory Administration</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--primary-subtle)', color: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h5 style={{ fontWeight: 600 }}>Headquarters</h5>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>100 Innovation Blvd, Silicon Valley, CA 94025</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--primary-subtle)', color: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h5 style={{ fontWeight: 600 }}>Telephone</h5>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>+1 (800) 555-BIZZ (Mon - Fri: 9am - 5pm PST)</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--primary-subtle)', color: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h5 style={{ fontWeight: 600 }}>Email</h5>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>contact@directbizz.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="form-card" style={{ maxWidth: '100%' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Send Us a Message</h3>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CheckCircle2 size={26} />
              </div>
              <h4>Message Received</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                Our team will review your inquiry and respond within 1 business day.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name <span className="req">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address <span className="req">*</span></label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul.sharma@example.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Listing feedback / Inquiry"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message <span className="req">*</span></label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please write your inquiry here..."
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {submitting ? 'Sending...' : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
