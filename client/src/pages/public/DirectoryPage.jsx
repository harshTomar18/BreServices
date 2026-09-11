import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDirectory } from '../../context/DirectoryContext';
import FilterSidebar from '../../components/directory/FilterSidebar';
import BusinessCard from '../../components/directory/BusinessCard';
import Pagination from '../../components/common/Pagination';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ShieldCheck,
  ArrowLeftRight,
  ChevronDown,
  X
} from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export default function DirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { businesses, categories, categoryCounts, cities } = useDirectory();

  // Query params
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  const locationQuery = searchParams.get('location') || '';
  const sortQuery = searchParams.get('sort') || 'highest';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  // Local state for live inputs
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localLocation, setLocalLocation] = useState(locationQuery);
  const [localSort, setLocalSort] = useState(sortQuery);

  // Extract dynamic unique locations/cities from businesses in the database
  const availableLocations = useMemo(() => {
    const locSet = new Set();

    // From backend distinct cities
    if (cities && Array.isArray(cities)) {
      cities.forEach((c) => {
        if (c && c.trim()) locSet.add(c.trim());
      });
    }

    // From loaded businesses
    businesses.forEach((b) => {
      if (b.city && b.city.trim()) {
        locSet.add(b.city.trim());
      } else if (b.location && b.location.trim()) {
        const first = b.location.split(',')[0].trim();
        if (first) locSet.add(first);
      }
    });

    if (locSet.size === 0) {
      return ['Delhi', 'Noida', 'Gurugram', 'Bengaluru', 'Mumbai', 'Remote'];
    }

    return Array.from(locSet).sort((a, b) => a.localeCompare(b));
  }, [businesses, cities]);

  // Synchronize local state whenever URL query params change (e.g. from navbar or external navigation)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalLocation(locationQuery);
  }, [locationQuery]);

  // Filter criteria states
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [openNow, setOpenNow] = useState(false);
  const [onlineBooking, setOnlineBooking] = useState(false);
  const [ratingThreshold, setRatingThreshold] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Calculate active filter count for mobile badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (categoryQuery) count++;
    if (locationQuery) count++;
    if (verifiedOnly) count++;
    if (openNow) count++;
    if (onlineBooking) count++;
    if (ratingThreshold > 0) count++;
    return count;
  }, [categoryQuery, locationQuery, verifiedOnly, openNow, onlineBooking, ratingThreshold]);

  // Filter businesses
  const filteredBusinesses = useMemo(() => {
    let result = businesses.filter((b) => {
      if (b.status !== 'active') return false;

      // Category filter
      if (categoryQuery && b.category.toLowerCase() !== categoryQuery.toLowerCase()) {
        return false;
      }

      // Location / City filter
      if (locationQuery) {
        const loc = locationQuery.toLowerCase();
        const matchesLoc = b.location?.toLowerCase().includes(loc) || b.city?.toLowerCase().includes(loc);
        if (!matchesLoc) return false;
      }

      // Verified filter
      if (verifiedOnly && b.verified === false) {
        return false;
      }

      // Open now filter
      if (openNow && !b.openNow) {
        return false;
      }

      // Online booking filter
      if (onlineBooking && !b.onlineBooking) {
        return false;
      }

      // Rating filter
      if (ratingThreshold > 0 && (b.rating || 0) < ratingThreshold) {
        return false;
      }

      // Search keyword filter (searches across category, business name, and place / location)
      const effectiveSearch = localSearch.trim();
      if (effectiveSearch) {
        const queryTerms = effectiveSearch.toLowerCase().split(/\s+/).filter(Boolean);

        const catDetailsText = b.categoryDetails
          ? Object.values(b.categoryDetails).filter(Boolean).join(' ').toLowerCase()
          : '';

        const searchableText = [
          b.name,
          b.category,
          b.city,
          b.location,
          b.address,
          b.description,
          b.fullDescription,
          catDetailsText,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        // Every word in the search box must match somewhere in the business profile (name, category, place, tags)
        const matchesAllTerms = queryTerms.every((term) => searchableText.includes(term));
        if (!matchesAllTerms) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (localSort === 'highest') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (localSort === 'reviews') {
      result.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    } else if (localSort === 'alpha') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [
    businesses,
    localSearch,
    categoryQuery,
    locationQuery,
    verifiedOnly,
    openNow,
    onlineBooking,
    ratingThreshold,
    localSort,
  ]);

  // Pagination slice
  const totalItems = filteredBusinesses.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const currentPage = Math.min(Math.max(pageParam, 1), totalPages);

  const paginatedBusinesses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBusinesses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBusinesses, currentPage]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.set('page', '1');
    setSearchParams(next);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setLocalSearch(val);

    // If backspaced or cleared to empty, immediately clear search param in URL to show all!
    if (!val.trim()) {
      const next = new URLSearchParams(searchParams);
      next.delete('search');
      next.set('page', '1');
      setSearchParams(next, { replace: true });
    }
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    const next = new URLSearchParams(searchParams);
    next.delete('search');
    next.set('page', '1');
    setSearchParams(next, { replace: true });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (localSearch.trim()) next.set('search', localSearch.trim());
    else next.delete('search');

    if (localLocation) next.set('location', localLocation);
    else next.delete('location');

    if (localSort) next.set('sort', localSort);

    next.set('page', '1');
    setSearchParams(next);
  };

  const handleClearFilters = () => {
    setLocalSearch('');
    setLocalLocation('');
    setVerifiedOnly(false);
    setOpenNow(false);
    setOnlineBooking(false);
    setRatingThreshold(0);
    setSearchParams({});
  };

  return (
    <div className="directory-page-wrapper">
      <div className="container">
        {/* Page Header */}
        <div className="directory-header-row">
          <div>
            <h1 className="directory-main-title">
              Browse Businesses
            </h1>
            <p className="directory-main-subtitle">
              Search and filter through verified businesses and local services across all categories.
            </p>
          </div>

          <div className="directory-header-badges">
            <div className="found-count-pill">
              <ShieldCheck size={16} color="#2563eb" />
              <span>{filteredBusinesses.length} Businesses Found</span>
            </div>
          </div>
        </div>

        {/* Top Search & Filter Bar */}
        <div className="directory-top-search-card">
          <form onSubmit={handleSearchSubmit} className="top-search-form">
            {/* Search Input */}
            <div className="top-search-field">
              <Search size={17} className="top-search-icon" />
              <input
                type="text"
                value={localSearch}
                onChange={handleSearchChange}
                placeholder="Search by category, business name, or place / location..."
                className="top-search-input"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="top-search-clear-btn"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Location Dropdown - Dynamically Populated from Database */}
            <div className="top-select-field">
              <MapPin size={16} className="top-select-icon" />
              <select
                value={localLocation}
                onChange={(e) => {
                  setLocalLocation(e.target.value);
                  updateParam('location', e.target.value);
                }}
                className="top-select-input"
              >
                <option value="">All Locations (NCR &amp; Pan-India)</option>
                {availableLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="top-select-arrow" />
            </div>

            {/* Sort Dropdown */}
            <div className="top-select-field">
              <SlidersHorizontal size={16} className="top-select-icon" />
              <select
                value={localSort}
                onChange={(e) => {
                  setLocalSort(e.target.value);
                  updateParam('sort', e.target.value);
                }}
                className="top-select-input"
              >
                <option value="highest">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="alpha">Alphabetical (A-Z)</option>
              </select>
              <ChevronDown size={14} className="top-select-arrow" />
            </div>

            {/* Search Button */}
            <button type="submit" className="top-search-btn">
              <Search size={16} />
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Active Criteria Strip & View Mode Controls */}
        <div className="active-criteria-bar">
          <div className="criteria-left-group">
            <span className="criteria-label">ACTIVE CRITERIA:</span>

            <span className="criteria-pill">
              Category: <strong>{categoryQuery || 'All'}</strong>
            </span>

            {verifiedOnly && (
              <span className="criteria-pill green-pill">
                ✓ Verified Only
              </span>
            )}

            <span className="criteria-pill">
              Location: <strong>{locationQuery || 'All Regions'}</strong>
            </span>
          </div>

          <div className="criteria-right-group">
            <span className="view-mode-label">View Mode:</span>
            <div className="view-mode-toggle-group">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                aria-label="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                aria-label="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filter Control Bar (Visible only on mobile/tablet screens <= 900px) */}
        <div className="mobile-filter-bar">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="mobile-filter-toggle-btn"
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="mobile-filter-count-badge">{activeFiltersCount}</span>
            )}
          </button>

          <div className="mobile-view-toggle">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              aria-label="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="List View"
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* Mobile Slide-Over Filter Drawer */}
        <div
          className={`mobile-filter-drawer-overlay ${mobileFiltersOpen ? 'open' : ''}`}
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            className="mobile-filter-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-filter-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SlidersHorizontal size={17} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Filters</h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mobile-filter-close-btn"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mobile-filter-drawer-body">
              <FilterSidebar
                selectedCategory={categoryQuery}
                onSelectCategory={(cat) => updateParam('category', cat)}
                selectedLocation={locationQuery}
                onSelectLocation={(loc) => updateParam('location', loc)}
                verifiedOnly={verifiedOnly}
                onToggleVerified={setVerifiedOnly}
                openNow={openNow}
                onToggleOpenNow={setOpenNow}
                onlineBooking={onlineBooking}
                onToggleOnlineBooking={setOnlineBooking}
                ratingThreshold={ratingThreshold}
                onSelectRating={setRatingThreshold}
                onClearFilters={handleClearFilters}
                locations={availableLocations}
                categories={categories}
                categoryCounts={categoryCounts}
                totalActiveCount={businesses.filter((b) => b.status === 'active').length}
              />
            </div>

            <div className="mobile-filter-drawer-footer">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              >
                Show {filteredBusinesses.length} Listings
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="directory-main-layout">
          {/* Left Filter Sidebar (Desktop View) */}
          <div className="desktop-filter-sidebar-col">
            <FilterSidebar
              selectedCategory={categoryQuery}
              onSelectCategory={(cat) => updateParam('category', cat)}
              selectedLocation={locationQuery}
              onSelectLocation={(loc) => updateParam('location', loc)}
              verifiedOnly={verifiedOnly}
              onToggleVerified={setVerifiedOnly}
              openNow={openNow}
              onToggleOpenNow={setOpenNow}
              onlineBooking={onlineBooking}
              onToggleOnlineBooking={setOnlineBooking}
              ratingThreshold={ratingThreshold}
              onSelectRating={setRatingThreshold}
              onClearFilters={handleClearFilters}
              locations={availableLocations}
              categories={categories}
              categoryCounts={categoryCounts}
              totalActiveCount={businesses.filter((b) => b.status === 'active').length}
            />
          </div>

          {/* Right Results Grid */}
          <main className="directory-results-container">
            {paginatedBusinesses.length === 0 ? (
              <div className="directory-empty-state">
                <ShieldCheck size={42} color="var(--primary)" style={{ opacity: 0.6, marginBottom: '1rem' }} />
                <h3>No businesses match your criteria</h3>
                <p>Try adjusting your category, city filter, or search query to find active listings.</p>
                <button onClick={handleClearFilters} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`directory-cards-container ${viewMode === 'list' ? 'list-mode' : 'grid-mode'}`}>
                {paginatedBusinesses.map((biz) => (
                  <BusinessCard key={biz.id} business={biz} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ marginTop: '2.5rem' }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(p) => {
                    const next = new URLSearchParams(searchParams);
                    next.set('page', String(p));
                    setSearchParams(next);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                  totalItems={totalItems}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
