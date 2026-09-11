import { Building2, ShieldCheck, Search, Users, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
        <div className="hero-badge">
          <Building2 size={14} />
          <span>Our Mission</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Empowering Communities with Verified Local Businesses
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          DirectBizz is an independent business directory created to connect customers with genuine, reputable service providers and enterprises across the country.
        </p>
      </div>

      <div className="features-grid" style={{ marginBottom: '4rem' }}>
        <div className="info-card">
          <div style={{ width: '44px', height: '44px', background: 'var(--primary-subtle)', color: 'var(--primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <ShieldCheck size={22} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Rigorous Verification</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
            Every listing published on DirectBizz is vetted for active operations, valid commercial phone numbers, and legitimate physical office locations.
          </p>
        </div>

        <div className="info-card">
          <div style={{ width: '44px', height: '44px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Search size={22} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Fast & Uncluttered Search</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
            No intrusive advertisements or paid review manipulation. Users find accurate business profiles through category and location filters.
          </p>
        </div>

        <div className="info-card">
          <div style={{ width: '44px', height: '44px', background: 'var(--warning-bg)', color: 'var(--warning)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Users size={22} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Editorial Administration</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
            Only authorized administrators manage profiles to protect consumers from misleading information, spam listings, or abandoned profiles.
          </p>
        </div>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '3rem', textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Ready to discover top local businesses?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
          Explore hundreds of active providers across IT, healthcare, gastronomy, and finance.
        </p>
        <Link to="/businesses" className="btn btn-primary btn-lg">
          Browse Directory Now
        </Link>
      </div>
    </div>
  );
}
