export function BusinessCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div className="skeleton" style={{ width: '60%', height: '22px' }} />
        <div className="skeleton" style={{ width: '25%', height: '20px', borderRadius: '999px' }} />
      </div>
      <div className="skeleton" style={{ width: '100%', height: '14px', marginBottom: '0.5rem' }} />
      <div className="skeleton" style={{ width: '80%', height: '14px', marginBottom: '1.5rem' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div className="skeleton" style={{ width: '45%', height: '14px' }} />
        <div className="skeleton" style={{ width: '40%', height: '14px' }} />
      </div>
      <div className="skeleton" style={{ width: '100%', height: '38px', borderRadius: '8px' }} />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div style={{ padding: '1rem' }}>
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.85rem 0',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="skeleton" style={{ width: '25%', height: '18px' }} />
          <div className="skeleton" style={{ width: '15%', height: '18px' }} />
          <div className="skeleton" style={{ width: '20%', height: '18px' }} />
          <div className="skeleton" style={{ width: '15%', height: '18px' }} />
          <div className="skeleton" style={{ width: '10%', height: '18px' }} />
          <div className="skeleton" style={{ width: '10%', height: '28px', marginLeft: 'auto', borderRadius: '6px' }} />
        </div>
      ))}
    </div>
  );
}
