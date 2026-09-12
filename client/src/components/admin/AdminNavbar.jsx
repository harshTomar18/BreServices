import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminNavbar({ onToggleSidebar }) {
  const { adminUser } = useAuth();

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <button
          onClick={onToggleSidebar}
          className="admin-nav-toggle"
          aria-label="Toggle admin sidebar"
          type="button"
        >
          <Menu size={20} />
        </button>
        <div className="admin-topbar-title-group">
          <span className="admin-topbar-title">Admin Console</span>
          <span className="admin-topbar-badge">v1.0</span>
        </div>
      </div>

      <div className="admin-topbar-right">
        {/* Notification indicator */}
        <button
          className="admin-notify-btn"
          title="Notifications"
          aria-label="View notifications"
          type="button"
        >
          <Bell size={18} />
          <span className="admin-notify-badge" />
        </button>

        {/* Profile */}
        <div className="admin-profile-pill">
          <div className="admin-profile-avatar">
            {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : <User size={18} />}
          </div>
          <div className="admin-profile-meta">
            <span className="admin-profile-name">
              {adminUser?.name || 'Administrator'}
            </span>
            <span className="admin-profile-role">
              {adminUser?.role || 'Super Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
