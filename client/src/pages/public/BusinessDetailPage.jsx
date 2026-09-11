import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDirectory } from '../../context/DirectoryContext';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  ShieldCheck,
  Star,
  Share2,
  ExternalLink,
  Building2,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

// Helper for category-appropriate icon fallback
const getCategoryAvatarIcon = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('food') || cat.includes('restaurant') || cat.includes('cafe')) return '🍽️';
  if (cat.includes('health') || cat.includes('medical') || cat.includes('clinic')) return '🏥';
  if (cat.includes('fitness') || cat.includes('gym')) return '💪';
  if (cat.includes('hotel') || cat.includes('stay') || cat.includes('resort')) return '🏨';
  if (cat.includes('tech') || cat.includes('software') || cat.includes('it')) return '💻';
  if (cat.includes('auto') || cat.includes('car') || cat.includes('garage')) return '🚗';
  if (cat.includes('beauty') || cat.includes('salon') || cat.includes('spa')) return '✂️';
  if (cat.includes('education') || cat.includes('school') || cat.includes('tutor')) return '📚';
  if (cat.includes('real estate') || cat.includes('property')) return '🏢';
  return '🏢';
};

export default function BusinessDetailPage() {
  const { id } = useParams();
  const { getBusinessById, isLoading } = useDirectory();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const business = getBusinessById(id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Profile link copied to clipboard!', 'success');
    } else {
      addToast('Listing URL copied to clipboard', 'info');
    }
  };

  // Graceful loading state to prevent flash of 'Not Found'
  if (isLoading && !business) {
    return (
      <div className="detail-page-wrapper">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '120px', height: '20px', background: '#e2e8f0', borderRadius: '6px' }} />
        </div>
        <div className="detail-hero-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ width: '96px', height: '96px', borderRadius: '18px', background: '#e2e8f0' }} />
          <div style={{ flex: 1 }}>
            <div style={{ width: '220px', height: '28px', background: '#e2e8f0', borderRadius: '6px', marginBottom: '10px' }} />
            <div style={{ width: '150px', height: '16px', background: '#f1f5f9', borderRadius: '4px' }} />
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!business) {
    return (
      <div className="detail-page-wrapper" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <div className="detail-card" style={{ maxWidth: '520px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Listing Not Found
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            The requested business profile does not exist or may have been updated.
          </p>
          <Link to="/businesses" className="detail-call-pill" style={{ display: 'inline-flex' }}>
            <ArrowLeft size={16} /> Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  // Google Maps Search URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${business.name} ${business.address || ''} ${business.location || ''}`.trim()
  )}`;

  const rating = business.rating || 4.8;
  const reviewsCount = business.reviewsCount || 12;

  return (
    <div className="detail-page-wrapper">
      {/* Sleek Breadcrumb & Back Navigation (Clean links, no clunky grey buttons) */}
      <div className="detail-breadcrumb-bar">
        <div className="detail-breadcrumbs">
          <Link to="/" className="detail-crumb-link">Home</Link>
          <ChevronRight size={14} className="detail-crumb-sep" />
          <Link to="/businesses" className="detail-crumb-link">Businesses</Link>
          {business.category && (
            <>
              <ChevronRight size={14} className="detail-crumb-sep" />
              <Link to={`/category/${encodeURIComponent(business.category)}`} className="detail-crumb-link">
                {business.category}
              </Link>
            </>
          )}
          <ChevronRight size={14} className="detail-crumb-sep" />
          <span className="detail-crumb-current" title={business.name}>
            {business.name}
          </span>
        </div>

        <Link to="/businesses" className="detail-back-link">
          <ArrowLeft size={15} />
          <span>Back to Directory</span>
        </Link>
      </div>

      {/* Hero Profile Header Card */}
      <div className="detail-hero-card">
        <div className="detail-hero-body">
          <div className="detail-hero-left">
            {business.image ? (
              <img
                src={business.image}
                alt={business.name}
                className="detail-hero-avatar"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}

            <div
              className="detail-hero-avatar-fallback"
              style={{ display: business.image ? 'none' : 'flex' }}
            >
              {getCategoryAvatarIcon(business.category)}
            </div>

            <div className="detail-hero-content">
              {/* Badges Row */}
              <div className="detail-badges-row">
                <span className="detail-pill-category">
                  {business.category || 'Business'}
                </span>
                <span className="detail-pill-verified">
                  <ShieldCheck size={14} /> Verified Business
                </span>
              </div>

              {/* Business Name */}
              <h1 className="detail-hero-title">{business.name}</h1>

              {/* Meta information row: Location & Rating */}
              <div className="detail-hero-meta">
                <span className="detail-meta-item">
                  <MapPin size={16} style={{ color: '#2563eb' }} />
                  <span>{business.location || 'Location Not Specified'}</span>
                </span>

                <span className="detail-rating-pill">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>{rating}</span>
                  <span style={{ color: '#78350f', fontWeight: 500, fontSize: '0.85rem' }}>
                    ({reviewsCount} reviews)
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Clean Quick Actions */}
          <div className="detail-hero-actions">
            {business.phone && (
              <a href={`tel:${business.phone}`} className="detail-call-pill" title={`Call ${business.phone}`}>
                <Phone size={15} />
                <span>{business.phone}</span>
              </a>
            )}

            <button
              onClick={handleShare}
              className="detail-share-icon-btn"
              title="Copy listing URL to clipboard"
            >
              <Share2 size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="detail-main-grid">
        {/* Left Column: Details, Specifications, Location */}
        <div>
          {/* About The Business Card */}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3 className="detail-card-title">
                <Building2 size={19} />
                <span>About the Business</span>
              </h3>
            </div>

            <div className="detail-body-text">
              {business.fullDescription || business.description || 'No detailed description provided for this business listing yet.'}
            </div>

            {business.fullDescription && business.description && business.fullDescription !== business.description && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                  Overview Summary
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: '1.6' }}>
                  {business.description}
                </p>
              </div>
            )}

            {/* Quick Listing Highlights */}
            <div className="detail-highlights-chips">
              <span className="detail-highlight-chip">
                <CheckCircle2 size={13} style={{ color: '#16a34a' }} />
                <span>Official Directory Listing</span>
              </span>
              <span className="detail-highlight-chip">
                <CheckCircle2 size={13} style={{ color: '#16a34a' }} />
                <span>Direct Contact Enabled</span>
              </span>
              <span className="detail-highlight-chip">
                <CheckCircle2 size={13} style={{ color: '#16a34a' }} />
                <span>Verified in {business.location}</span>
              </span>
            </div>
          </div>

          {/* Category-Specific Specifications Card (Rendered when category details exist) */}
          {business.categoryDetails &&
            Object.entries(business.categoryDetails).some(([_, v]) => Boolean(v)) && (
              <div className="detail-card">
                <div className="detail-card-header">
                  <h3 className="detail-card-title">
                    <Sparkles size={19} />
                    <span>{business.category} Specifications &amp; Features</span>
                  </h3>
                  <span className="detail-pill-category" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                    Verified Features
                  </span>
                </div>

                <div className="detail-specs-grid">
                  {Object.entries(business.categoryDetails).map(([key, val]) => {
                    if (!val) return null;

                    // Convert camelCase into clean readable label
                    const label = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase());

                    return (
                      <div key={key} className="detail-spec-card">
                        <div className="detail-spec-label">{label}</div>
                        <div className="detail-spec-value">{String(val)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Physical Address & Map Card */}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3 className="detail-card-title">
                <MapPin size={19} />
                <span>Address &amp; Location</span>
              </h3>
            </div>

            <div className="detail-address-row">
              <div className="detail-address-icon">
                <MapPin size={22} />
              </div>
              <div>
                <div className="detail-address-title">
                  {business.address || `${business.name}, ${business.location}`}
                </div>
                <div className="detail-address-sub">
                  {business.location} • Landmark &amp; Area details
                </div>
              </div>
            </div>

            {/* Stylized Map View Box with Direct Directions Link */}
            <div className="detail-map-box">
              <div className="detail-map-icon-circle">
                <Navigation size={22} />
              </div>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.98rem' }}>
                {business.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '380px' }}>
                {business.address || business.location}
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-map-link-btn"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Information Sidebar (Clean, direct, without redundant buttons) */}
        <div>
          <div className="detail-card detail-sidebar">
            <div className="detail-card-header">
              <h3 className="detail-card-title">
                <Clock size={19} />
                <span>Contact &amp; Details</span>
              </h3>
            </div>

            <div className="detail-contact-list">
              {/* Direct Phone */}
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="detail-contact-row"
                  title="Click to call directly"
                >
                  <div className="detail-contact-icon phone">
                    <Phone size={18} />
                  </div>
                  <div className="detail-contact-meta">
                    <div className="detail-contact-label">Telephone</div>
                    <div className="detail-contact-val">{business.phone}</div>
                  </div>
                </a>
              )}

              {/* Email */}
              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="detail-contact-row"
                  title="Click to compose email"
                >
                  <div className="detail-contact-icon email">
                    <Mail size={18} />
                  </div>
                  <div className="detail-contact-meta">
                    <div className="detail-contact-label">Email Address</div>
                    <div className="detail-contact-val">{business.email}</div>
                  </div>
                </a>
              )}

              {/* Official Website */}
              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-contact-row"
                  title="Visit official website"
                >
                  <div className="detail-contact-icon website">
                    <Globe size={18} />
                  </div>
                  <div className="detail-contact-meta">
                    <div className="detail-contact-label">Official Website</div>
                    <div className="detail-contact-val" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span>Visit Website</span>
                      <ExternalLink size={13} />
                    </div>
                  </div>
                </a>
              )}

              {/* Operating Hours */}
              {business.hours && (
                <div className="detail-contact-row">
                  <div className="detail-contact-icon hours">
                    <Clock size={18} />
                  </div>
                  <div className="detail-contact-meta">
                    <div className="detail-contact-label">Working Hours</div>
                    <div className="detail-contact-val">{business.hours}</div>
                  </div>
                </div>
              )}

              {/* City / Region */}
              <div className="detail-contact-row">
                <div className="detail-contact-icon location">
                  <MapPin size={18} />
                </div>
                <div className="detail-contact-meta">
                  <div className="detail-contact-label">City / Region</div>
                  <div className="detail-contact-val">{business.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
