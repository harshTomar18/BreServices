import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({
  title = 'No businesses found',
  description = 'We could not find any listings matching your search or filter criteria. Try adjusting your keywords or clearing the filters.',
  onClearFilters,
}) {
  return (
    <div className="state-box">
      <div className="state-icon-box">
        <SearchX size={28} />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-desc">{description}</p>
      {onClearFilters && (
        <button onClick={onClearFilters} className="btn btn-secondary">
          <RotateCcw size={16} />
          Clear All Filters
        </button>
      )}
    </div>
  );
}
