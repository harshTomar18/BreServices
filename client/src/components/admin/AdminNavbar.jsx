import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminNavbar({ onToggleSidebar }) {
  const { adminUser } = useAuth();

  return (
    <header className="admin-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleSidebar}
          className="btn-icon mobile-nav-toggle"
          style={{ display: 'flex' }}
          aria-label="Toggle admin sidebar"
        >
          <Menu size={20} />
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          BRE Services Admin Console v1.0
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Notification indicator */}
        <button
          className="btn-icon"
          title="Notifications"
          style={{ position: 'relative' }}
          aria-label="View notifications"
        >
          <Bell size={18} />
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
            }}
          />
        </button>

        {/* Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--primary-subtle)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: '1px solid var(--primary-border)',
            }}
          >
            {adminUser?.name ? adminUser.name.charAt(0) : <User size={18} />}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {adminUser?.name || 'Administrator'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {adminUser?.role || 'Super Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
