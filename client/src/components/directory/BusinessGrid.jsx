import BusinessCard from './BusinessCard';
import { BusinessCardSkeleton } from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';

export default function BusinessGrid({
  businesses = [],
  loading = false,
  onClearFilters,
  emptyTitle,
  emptyDescription,
}) {
  if (loading) {
    return (
      <div className="business-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <BusinessCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || 'No businesses found'}
        description={emptyDescription || 'No active listings match your current filters. Try changing or clearing your criteria.'}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="business-grid">
      {businesses.map((biz) => (
        <BusinessCard key={biz.id} business={biz} />
      ))}
    </div>
  );
}
