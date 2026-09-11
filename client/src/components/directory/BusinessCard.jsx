import { Link } from 'react-router-dom';
import { MapPin, Phone, Star, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BusinessCard({ business }) {
  // Fallback high-res thumbnail if not provided
  const thumbnail =
    business.image ||
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80';

  const categoryName = business.category || 'General';
  const rating = business.rating || 4.9;
  const reviewsCount = business.reviewsCount || 128;

  return (
    <article className="directory-biz-card">
      {/* Top Row: Thumbnail on Left, Stacked Badges on Right */}
      <div className="biz-card-top-row">
        <img
          src={thumbnail}
          alt={business.name}
          className="biz-card-thumb"
          loading="lazy"
        />

        <div className="biz-card-badges-stack">
          {business.verified !== false && (
            <span className="biz-badge-verified">
              <span className="biz-badge-dot"></span>
              <span>Verified</span>
            </span>
          )}
          <span className="biz-badge-category">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Title with Verified Check Badge */}
      <div className="biz-card-title-row">
        <h3 className="biz-card-title" title={business.name}>
          {business.name}
        </h3>
        <CheckCircle2
          size={17}
          className="biz-verified-icon"
          color="#2563eb"
          fill="#2563eb"
        />
      </div>

      {/* Location */}
      <div className="biz-card-location-row">
        <MapPin size={14} className="biz-loc-icon" />
        <span>{business.location || 'India'}</span>
      </div>

      {/* 2-line clamped description */}
      <p className="biz-card-desc">
        {business.description}
      </p>

      {/* Meta Row: Rating on Left, Phone on Right */}
      <div className="biz-card-meta-row">
        <div className="biz-card-rating">
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span className="biz-rating-num">{rating}</span>
          <span className="biz-rating-reviews">({reviewsCount} reviews)</span>
        </div>

        {business.phone && (
          <div className="biz-card-phone">
            <Phone size={13} className="biz-phone-icon" />
            <a
              href={`tel:${business.phone}`}
              className="biz-phone-link"
              title={`Call ${business.name}`}
            >
              {business.phone}
            </a>
          </div>
        )}
      </div>

      {/* Action Button: View Details */}
      <Link
        to={`/business/${business.id}`}
        className="biz-card-view-btn"
      >
        <span>View Details</span>
        <ArrowRight size={15} />
      </Link>
    </article>
  );
}
