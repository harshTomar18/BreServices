export default function StatsCard({ title, value, icon: Icon, color = 'primary', change }) {
  const colorStyles = {
    primary: {
      bg: 'var(--primary-subtle)',
      color: 'var(--primary)',
    },
    success: {
      bg: 'var(--success-bg)',
      color: 'var(--success)',
    },
    warning: {
      bg: 'var(--warning-bg)',
      color: 'var(--warning)',
    },
    info: {
      bg: '#f1f5f9',
      color: 'var(--text-secondary)',
    },
  };

  const currentStyle = colorStyles[color] || colorStyles.primary;

  return (
    <div className="stats-card">
      <div
        className="stats-icon-wrapper"
        style={{ background: currentStyle.bg, color: currentStyle.color }}
      >
        <Icon size={24} />
      </div>
      <div>
        <div className="stats-label">{title}</div>
        <div className="stats-number">{value}</div>
        {change && (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
}
