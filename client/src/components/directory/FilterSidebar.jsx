import { useMemo } from 'react';
import { SlidersHorizontal, RotateCcw, ShieldCheck, Check } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory = '',
  onSelectCategory,
  selectedLocation = '',
  onSelectLocation,
  verifiedOnly = true,
  onToggleVerified,
  openNow = false,
  onToggleOpenNow,
  onlineBooking = false,
  onToggleOnlineBooking,
  ratingThreshold = 0,
  onSelectRating,
  onClearFilters,
  locations = [],
  categories = [],
  categoryCounts = {},
  totalActiveCount = 0,
}) {
  // Build dynamic categories list with real counts from database
  const dynamicCategoryList = useMemo(() => {
    const list = [{ name: 'All Categories', count: totalActiveCount || 0, key: '' }];
    
    const allCatNames = new Set();
    if (Array.isArray(categories) && categories.length > 0) {
      categories.forEach((c) => {
        const name = typeof c === 'string' ? c : c.name;
        if (name) allCatNames.add(name);
      });
    } else {
      const standardTaxonomy = [
        'IT Services',
        'Restaurants',
        'Healthcare',
        'Education',
        'Real Estate',
        'Finance',
      ];
      standardTaxonomy.forEach((name) => allCatNames.add(name));
    }

    allCatNames.forEach((catName) => {
      list.push({
        name: catName,
        count: categoryCounts[catName] || 0,
        key: catName,
      });
    });

    return list;
  }, [categories, categoryCounts, totalActiveCount]);

  // Split dynamic locations into 2-column grid pairs
  const dynamicRegionPairs = useMemo(() => {
    const locs = locations && locations.length > 0
      ? locations
      : ['Delhi', 'Noida', 'Gurugram', 'Bengaluru', 'Mumbai', 'Remote'];

    const pairs = [];
    for (let i = 0; i < locs.length; i += 2) {
      pairs.push(locs.slice(i, i + 2));
    }
    return pairs;
  }, [locations]);

  return (
    <aside className="directory-filter-panel">
      {/* Header */}
      <div className="filter-panel-header">
        <div className="filter-panel-title">
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className="filter-clear-btn"
        >
          Clear Filters
        </button>
      </div>

      {/* 1. CATEGORIES */}
      <div className="filter-section-block">
        <h4 className="filter-section-title">CATEGORIES</h4>
        <div className="filter-radio-list">
          {dynamicCategoryList.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.key.toLowerCase();
            return (
              <label
                key={cat.name}
                className={`filter-radio-item ${isSelected ? 'selected' : ''}`}
              >
                <div className="radio-left">
                  <input
                    type="radio"
                    name="category"
                    checked={isSelected}
                    onChange={() => onSelectCategory(cat.key)}
                    className="custom-radio"
                  />
                  <span className="radio-label">{cat.name}</span>
                </div>
                <span className="filter-count-num">{cat.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. CITY / REGION */}
      <div className="filter-section-block">
        <h4 className="filter-section-title">CITY / REGION</h4>
        <div className="region-grid-options">
          {dynamicRegionPairs.map((pair, idx) => (
            <div key={idx} className="region-row-pair">
              {pair.map((city) => {
                const isChecked = selectedLocation.toLowerCase() === city.toLowerCase();
                return (
                  <label key={city} className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onSelectLocation(isChecked ? '' : city)}
                      className="custom-checkbox"
                    />
                    <span>{city}</span>
                  </label>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 3. VERIFICATION & STATUS */}
      <div className="filter-section-block">
        <h4 className="filter-section-title">VERIFICATION &amp; STATUS</h4>
        <div className="verification-options-list">
          {/* Verified Only */}
          <label className="checkbox-item-label verification-highlight-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => onToggleVerified(e.target.checked)}
                className="custom-checkbox"
              />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={15} color="#2563eb" />
                Verified Only
              </span>
            </div>
            <span className="verified-status-dot"></span>
          </label>

          {/* Open Now */}
          <label className="checkbox-item-label">
            <input
              type="checkbox"
              checked={openNow}
              onChange={(e) => onToggleOpenNow(e.target.checked)}
              className="custom-checkbox"
            />
            <span>Open Now</span>
          </label>

          {/* Accepts Online Bookings */}
          <label className="checkbox-item-label">
            <input
              type="checkbox"
              checked={onlineBooking}
              onChange={(e) => onToggleOnlineBooking(e.target.checked)}
              className="custom-checkbox"
            />
            <span>Accepts Online Bookings</span>
          </label>
        </div>
      </div>

      {/* 4. RATING THRESHOLD */}
      <div className="filter-section-block" style={{ borderBottom: 'none' }}>
        <h4 className="filter-section-title">RATING THRESHOLD</h4>
        <div className="filter-radio-list">
          <label className="filter-radio-item">
            <div className="radio-left">
              <input
                type="radio"
                name="rating"
                checked={ratingThreshold === 0}
                onChange={() => onSelectRating(0)}
                className="custom-radio"
              />
              <span className="radio-label">Any Rating</span>
            </div>
          </label>
          <label className="filter-radio-item">
            <div className="radio-left">
              <input
                type="radio"
                name="rating"
                checked={ratingThreshold === 4.5}
                onChange={() => onSelectRating(4.5)}
                className="custom-radio"
              />
              <span className="radio-label">4.5+ Stars Rated</span>
            </div>
          </label>
          <label className="filter-radio-item">
            <div className="radio-left">
              <input
                type="radio"
                name="rating"
                checked={ratingThreshold === 4.0}
                onChange={() => onSelectRating(4.0)}
                className="custom-radio"
              />
              <span className="radio-label">4.0+ Stars Rated</span>
            </div>
          </label>
        </div>
      </div>
    </aside>
  );
}
