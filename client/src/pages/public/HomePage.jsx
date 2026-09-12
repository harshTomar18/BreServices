import { Link } from 'react-router-dom';
import { useDirectory } from '../../context/DirectoryContext';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  Building2,
  LogIn,
  UserPlus,
  Laptop,
  Utensils,
  Stethoscope,
  GraduationCap,
  Landmark,
  ShoppingBag,
  Boxes,
  MapPin,
  Phone,
  Star,
  Dumbbell
} from 'lucide-react';

const getCategoryMeta = (catName) => {
  const map = {
    'IT Services': {
      icon: Laptop,
      bg: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.08))',
      color: '#2563eb',
      subtitle: 'Software, cloud, web & IT support',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(239, 246, 255, 0.65) 100%)',
      accentGrad: 'linear-gradient(90deg, #2563eb, #3b82f6)',
      glow: 'rgba(37, 99, 235, 0.2)',
    },
    'Restaurants': {
      icon: Utensils,
      bg: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(99, 102, 241, 0.08))',
      color: '#4f46e5',
      subtitle: 'Dining, cafes, executive catering',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(238, 242, 255, 0.65) 100%)',
      accentGrad: 'linear-gradient(90deg, #4f46e5, #6366f1)',
      glow: 'rgba(79, 70, 229, 0.2)',
    },
    'Healthcare': {
      icon: Stethoscope,
      bg: 'linear-gradient(135deg, rgba(13, 148, 136, 0.15), rgba(20, 184, 166, 0.08))',
      color: '#0d9488',
      subtitle: 'Clinics, diagnostic centers & wellness',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 250, 0.65) 100%)',
      accentGrad: 'linear-gradient(90deg, #0d9488, #14b8a6)',
      glow: 'rgba(13, 148, 136, 0.2)',
    },
    'Education': {
      icon: GraduationCap,
      bg: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15), rgba(16, 185, 129, 0.08))',
      color: '#059669',
      subtitle: 'Academies, coaching & professional STEM',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(236, 253, 245, 0.65) 100%)',
      accentGrad: 'linear-gradient(90deg, #059669, #10b981)',
      glow: 'rgba(5, 150, 105, 0.2)',
    },
    'Real Estate': {
      icon: Building2,
      bg: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(139, 92, 246, 0.08))',
      color: '#7c3aed',
      subtitle: 'Commercial leases & managed spaces',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 243, 255, 0.65) 100%)',
      accentGrad: 'linear-gradient(90deg, #7c3aed, #8b5cf6)',
      glow: 'rgba(124, 58, 237, 0.2)',
    },
    'Finance': {
      icon: Landmark,
      bg: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(14, 165, 233, 0.08))',
      color: '#0284c7',
      subtitle: 'Corporate taxation, legal & advisory',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.65) 100%)',
      accentGrad: 'linear-gradient(90deg, #0284c7, #0ea5e9)',
      glow: 'rgba(2, 132, 199, 0.2)',
    },
    'Shopping': {
      icon: ShoppingBag,
      bg: 'linear-gradient(135deg, rgba(219, 39, 119, 0.15), rgba(236, 72, 153, 0.08))',
      color: '#db2777',
      subtitle: 'Wholesale, retail & merchant goods',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 242, 248, 0.65) 100%)',
      accentGrad: 'linear-gradient(90deg, #db2777, #ec4899)',
      glow: 'rgba(219, 39, 119, 0.2)',
    },
    'Gym': {
      icon: Dumbbell,
      bg: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(239, 68, 68, 0.08))',
      color: '#dc2626',
      subtitle: 'Fitness, strength & wellness centers',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 242, 242, 0.65) 100%)',
      accentGrad: 'linear-gradient(90deg, #dc2626, #ef4444)',
      glow: 'rgba(220, 38, 38, 0.2)',
    },
  };
  return (
    map[catName] || {
      icon: Boxes,
      bg: 'linear-gradient(135deg, rgba(71, 85, 105, 0.15), rgba(100, 116, 139, 0.08))',
      color: '#475569',
      subtitle: 'Commercial enterprises & services',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.65) 100%)',
      accentGrad: 'linear-gradient(90deg, #475569, #64748b)',
      glow: 'rgba(71, 85, 105, 0.18)',
    }
  );
};

const extractDynamicTags = (biz) => {
  const tags = [];
  const cd = biz.categoryDetails;
  if (cd && typeof cd === 'object') {
    if (cd.serviceModel) tags.push(cd.serviceModel);
    if (cd.primaryTechStack) {
      cd.primaryTechStack.split(',').forEach((t) => {
        if (t.trim() && tags.length < 3) tags.push(t.trim());
      });
    }
    if (cd.cuisineType) {
      cd.cuisineType.split(',').forEach((c) => {
        if (c.trim() && tags.length < 3) tags.push(c.trim());
      });
    }
    if (cd.diningStyle && tags.length < 3) tags.push(cd.diningStyle);
    if (cd.specialization && tags.length < 3) {
      cd.specialization.split(',').forEach((s) => {
        if (s.trim() && tags.length < 3) tags.push(s.trim());
      });
    }
    if (cd.facilityType && tags.length < 3) tags.push(cd.facilityType);
    if (cd.propertyType && tags.length < 3) tags.push(cd.propertyType);
    if (cd.dealType && tags.length < 3) tags.push(cd.dealType);
    if (cd.institutionType && tags.length < 3) tags.push(cd.institutionType);
    if (cd.coursesOffered && tags.length < 3) {
      cd.coursesOffered.split(',').forEach((co) => {
        if (co.trim() && tags.length < 3) tags.push(co.trim());
      });
    }
    if (cd.financialServiceType && tags.length < 3) tags.push(cd.financialServiceType);
  }

  // Fallback defaults if no categoryDetails were provided
  if (tags.length === 0) {
    if (biz.category === 'IT Services') tags.push('Cloud Solutions', 'Software Engineering', 'Cybersecurity');
    else if (biz.category === 'Restaurants') tags.push('Fine Dining', 'Multi-Cuisine', 'Catering');
    else if (biz.category === 'Healthcare') tags.push('Multispecialty', 'Diagnostics', 'Emergency Care');
    else if (biz.category === 'Real Estate') tags.push('Commercial Spaces', 'Leasing', 'Prime Location');
    else if (biz.category === 'Education') tags.push('Professional Training', 'STEM', 'Certification');
    else if (biz.category === 'Finance') tags.push('Corporate Advisory', 'Tax Compliance', 'Audit');
    else tags.push(biz.category || 'Commercial', 'Verified Listing');
  }

  return tags.slice(0, 3);
};

export default function HomePage() {
  const { businesses, categories, categoryCounts } = useDirectory();
  const { currentUser, isUserAuthenticated, isAdminAuthenticated } = useAuth();

  const isLoggedIn = isUserAuthenticated || isAdminAuthenticated;

  // Real dynamic active featured businesses from MongoDB
  const featuredListings = (businesses || []).filter((b) => b.status === 'active').slice(0, 6);

  /* =========================================================================
     VIEW FOR LOGGED-IN USERS: Taxonomy Categories & Featured Businesses
     ========================================================================= */
  if (isLoggedIn) {
    return (
      <div className="portal-home-view">
        {/* Welcome Status Banner */}
        <section className="portal-welcome-strip">
          <div className="container">
            <div className="welcome-strip-inner">
              <div className="welcome-greeting-group">
                <div className="welcome-avatar-badge">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h1 className="welcome-title">
                    Welcome back, {currentUser?.name ? currentUser.name.split(' ')[0] : 'Member'}!
                  </h1>
                  <p className="welcome-subtitle">
                    Your enterprise member directory access is active and verified.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Taxonomy Navigation / Explore Categories */}
        <section className="portal-section taxonomy-section">
          <div className="container">
            {/* Header */}
            <div className="portal-section-header">
              <div>
                <div className="section-pre-title">
                  TAXONOMY NAVIGATION
                </div>
                <h2 className="portal-section-title">
                  Explore Categories
                </h2>
                <p className="portal-section-desc">
                  Find specialized vendors and local enterprises by industry sector.
                </p>
              </div>

              <Link
                to="/businesses"
                className="taxonomy-view-all-link"
              >
                <span>Browse entire directory taxonomy</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Dynamic Category Cards Grid */}
            <div className="taxonomy-category-grid">
              {(categories && categories.length > 0 ? categories : [
                { name: 'IT Services' },
                { name: 'Restaurants' },
                { name: 'Healthcare' },
                { name: 'Education' },
                { name: 'Real Estate' },
                { name: 'Finance' },
              ]).map((cat) => {
                const meta = getCategoryMeta(cat.name);
                const IconComp = meta.icon;
                const liveCount = categoryCounts?.[cat.name] ?? (businesses || []).filter(b => b.category?.toLowerCase() === cat.name?.toLowerCase()).length;

                return (
                  <Link
                    key={cat.id || cat.slug || cat.name}
                    to={`/businesses?category=${encodeURIComponent(cat.name)}`}
                    className="taxonomy-card"
                    style={{
                      '--card-bg': meta.cardBg,
                      '--card-accent-grad': meta.accentGrad,
                      '--card-glow': meta.glow,
                      '--card-border-hover': meta.color,
                      '--card-shadow': meta.glow,
                    }}
                  >
                    <div className="taxonomy-card-top">
                      <div className="taxonomy-icon-box" style={{ background: meta.bg, color: meta.color }}>
                        <IconComp size={22} />
                      </div>
                      <span className="taxonomy-count-badge">
                        {liveCount} {liveCount === 1 ? 'listing' : 'listings'}
                      </span>
                    </div>
                    <div className="taxonomy-card-body">
                      <h3 className="taxonomy-title">{cat.name}</h3>
                      <p className="taxonomy-subtitle">{cat.description || meta.subtitle}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Audited & High-Reputation Merchants / Featured Businesses */}
        <section className="portal-section featured-merchants-section">
          <div className="container">
            {/* Header with pill badge */}
            <div className="portal-section-header">
              <div>
                <div className="audited-pill-badge">
                  <span className="audited-pill-dot"></span>
                  <span>Audited &amp; High-Reputation Merchants</span>
                </div>
                <h2 className="portal-section-title">
                  Featured Businesses
                </h2>
                <p className="portal-section-desc">
                  Hand-picked, vetted, and top-rated providers ready to serve you.
                </p>
              </div>

              <Link to="/businesses" className="btn btn-secondary">
                <span>View All Businesses</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Dynamic Featured Business Cards Grid */}
            {featuredListings.length === 0 ? (
              <div className="directory-empty-state" style={{ margin: '1.5rem 0 3rem' }}>
                <h3>No Published Businesses Yet</h3>
                <p>New verified business profiles added in the Admin Console will automatically appear here.</p>
                <Link to="/businesses" className="btn btn-primary">
                  Explore Directory
                </Link>
              </div>
            ) : (
              <div className="featured-rich-grid">
                {featuredListings.map((biz) => {
                  const bizId = biz.id || biz._id;
                  const tags = extractDynamicTags(biz);
                  const imageSrc = biz.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';

                  return (
                    <div key={bizId} className="featured-rich-card">
                      {/* Card Image Banner with Category & Verified Badges */}
                      <div className="featured-rich-img-wrapper">
                        <img
                          src={imageSrc}
                          alt={biz.name}
                          className="featured-rich-img"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="featured-rich-cat-tag">
                          {biz.category}
                        </div>
                        {biz.verified !== false && (
                          <div className="featured-rich-verified-badge">
                            <CheckCircle2 size={13} color="#10b981" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="featured-rich-body">
                        <div className="featured-title-row">
                          <h3 className="featured-rich-title" title={biz.name}>{biz.name}</h3>
                          <div className="featured-rich-rating">
                            <Star size={14} fill="#f59e0b" color="#f59e0b" />
                            <span className="rating-score">{biz.rating || 4.9}</span>
                            <span className="rating-count">({biz.reviewsCount || biz.reviews || 120})</span>
                          </div>
                        </div>

                        <div className="featured-rich-meta">
                          <div className="featured-rich-meta-row">
                            <MapPin size={15} className="featured-meta-icon" />
                            <span>{biz.location || (biz.city ? `${biz.city}, India` : 'India')}</span>
                          </div>
                          {biz.phone && (
                            <div className="featured-rich-meta-row">
                              <Phone size={15} className="featured-meta-icon" />
                              <a href={`tel:${biz.phone}`} className="featured-phone-link">
                                {biz.phone}
                              </a>
                            </div>
                          )}
                        </div>

                        <p className="featured-rich-desc">
                          {biz.description}
                        </p>

                        {/* Dynamic Category Tags */}
                        <div className="featured-rich-tags">
                          {tags.map((tag) => (
                            <span key={tag} className="featured-tag-chip">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* View Details Button */}
                        <Link
                          to={`/business/${bizId}`}
                          className="btn btn-primary featured-action-btn"
                        >
                          <span>View Details</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Directory Access Banner */}
            <div className="directory-callout-card">
              <div className="callout-text-group">
                <h4 className="callout-title">
                  Looking for more commercial services?
                </h4>
                <p className="callout-desc">
                  Browse our full directory to filter by location, keyword search, and explore all service profiles.
                </p>
              </div>
              <Link to="/businesses" className="btn btn-primary">
                <span>Explore All Directory Listings</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* =========================================================================
     LANDING PAGE FOR VISITORS (NOT LOGGED IN): No directory data shown
     Clear invitation to Login or Register to access the directory!
     ========================================================================= */
  return (
    <div>
      {/* Public Landing Hero */}
      <section className="hero-section" style={{ padding: '5.5rem 0 4.5rem' }}>
        <div className="container hero-content">
          <div className="hero-badge">
            <ShieldCheck size={14} />
            <span>Verified Commercial Directory</span>
          </div>

          <h1 className="hero-title">
            Discover Verified Businesses &amp; Local Services
          </h1>

          <p className="hero-subtitle">
            BER Services is an exclusive, vetted business directory platform. Log in or create a free account to search commercial profiles, direct contact numbers, physical locations, and operating hours.
          </p>

          {/* Call to Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn btn-primary btn-lg">
              <LogIn size={18} />
              <span>Sign In to Access Directory</span>
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              <UserPlus size={18} />
              <span>Create Free Account</span>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.88rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--success)" /> 100% Free Registration
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--success)" /> Verified Contact Details
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--success)" /> Zero Spam Listings
            </span>
          </div>
        </div>
      </section>

      {/* Directory Teaser & Value Proposition */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <h2 className="section-title">What You Get Inside BER Services</h2>
            <p className="section-subtitle">
              Sign in to unlock our comprehensive ecosystem of professional services and local businesses.
            </p>
          </div>

          <div className="features-grid">
            <div className="info-card">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Search size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Advanced Keyword Search</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Filter listings by city, state, or service keywords to locate exactly what you need in seconds.
              </p>
            </div>

            <div className="info-card">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Detailed Business Profiles</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Access verified phone numbers, direct email addresses, websites, operating hours, and addresses.
              </p>
            </div>

            <div className="info-card">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--warning-bg)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Vetted &amp; Admin-Approved</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                No fake reviews or automated junk profiles. Every listing is reviewed by human administrators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview Preview */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            <h2 className="section-title">Industries Available After Sign In</h2>
            <p className="section-subtitle">
              Hundreds of verified companies across major market segments
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', maxWidth: '860px', margin: '0 auto 3rem' }}>
            {categories.map((cat) => (
              <span
                key={cat.id}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>🏷️</span> {cat.name}
              </span>
            ))}
          </div>

          {/* Locked Notice Card */}
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              background: 'var(--bg-subtle)',
              border: '1px dashed var(--border-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#ffffff',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Lock size={20} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Directory Listings are Protected</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              To ensure data privacy and maintain high directory quality, complete listing details are available exclusively to registered members.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/login" className="btn btn-primary">
                Sign In Now
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
