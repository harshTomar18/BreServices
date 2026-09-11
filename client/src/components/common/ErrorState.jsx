import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred while loading this data. Please try again.',
  onRetry,
}) {
  return (
    <div className="state-box" style={{ borderColor: 'var(--danger-border)' }}>
      <div className="state-icon-box" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>
        <AlertTriangle size={28} />
      </div>
      <h3 className="state-title" style={{ color: 'var(--danger)' }}>{title}</h3>
      <p className="state-desc">{description}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary">
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}
