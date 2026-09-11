import { useState, useEffect } from 'react';
import { fetchServices, createService } from '../services/api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState('Core Engine');
  const [formPrice, setFormPrice] = useState(99);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchServices();
      setServices(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formName || !formDesc) return;

    try {
      setSubmitting(true);
      setFormMessage(null);
      await createService({
        name: formName,
        description: formDesc,
        category: formCategory,
        price: Number(formPrice),
      });
      setFormMessage({ type: 'success', text: 'Service created successfully in MongoDB!' });
      setFormName('');
      setFormDesc('');
      loadServices();
    } catch (err) {
      setFormMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Business Services & Modules</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage and inspect enterprise business services connected via Node/Express and MongoDB.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Create Service Form */}
        <div className="status-card" style={{ height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.25rem' }}>Add New Service</h3>
          
          {formMessage && (
            <div style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1rem',
              fontSize: '0.85rem',
              background: formMessage.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: formMessage.type === 'success' ? '#6ee7b7' : '#fca5a5',
              border: `1px solid ${formMessage.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}>
              {formMessage.text}
            </div>
          )}

          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Service Name</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Risk Evaluation Engine"
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: '#0f172a',
                  color: '#fff',
                  fontFamily: 'inherit'
                }}
              >
                <option value="Core Engine">Core Engine</option>
                <option value="Rule Verification">Rule Verification</option>
                <option value="Analytics">Analytics</option>
                <option value="Integration">Integration</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Description</label>
              <textarea
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="Detailed description of the service..."
                rows="3"
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%' }}>
              {submitting ? 'Creating...' : '+ Create Service'}
            </button>
          </form>
        </div>

        {/* Existing Services List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Registered Services ({services.length})</h3>
            <button onClick={loadServices} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading services from API...</p>
          ) : error ? (
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', color: '#fca5a5' }}>
              Failed to connect to backend: {error}
            </div>
          ) : services.length === 0 ? (
            <div className="feature-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
              <h4>No Services Found</h4>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Use the form on the left to add your first service. (Requires active MongoDB connection)
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {services.map((svc) => (
                <div key={svc._id} className="feature-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem' }}>{svc.name}</h4>
                    <span className="arch-pill" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc' }}>
                      {svc.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    {svc.description}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Created: {new Date(svc.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
