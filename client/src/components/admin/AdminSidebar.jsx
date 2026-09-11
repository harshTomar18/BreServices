import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  FolderTree,
  LogOut,
  ExternalLink,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    addToast('Logged out of Admin Portal', 'info');
    navigate('/admin/login');
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="admin-sidebar-header">
        <div className="brand-icon" style={{ background: 'var(--primary)', width: '32px', height: '32px' }}>
          <Shield size={18} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            Admin Center
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Directory Management
          </div>
        </div>
      </div>

      <ul className="admin-sidebar-menu">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? 'admin-nav-item active' : 'admin-nav-item'
            }
            onClick={onClose}
            end
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/businesses"
            className={({ isActive }) =>
              isActive ? 'admin-nav-item active' : 'admin-nav-item'
            }
            onClick={onClose}
          >
            <Building2 size={18} />
            <span>Businesses</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/businesses/add"
            className={({ isActive }) =>
              isActive ? 'admin-nav-item active' : 'admin-nav-item'
            }
            onClick={onClose}
          >
            <PlusCircle size={18} />
            <span>Add Business</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive ? 'admin-nav-item active' : 'admin-nav-item'
            }
            onClick={onClose}
          >
            <FolderTree size={18} />
            <span>Categories</span>
          </NavLink>
        </li>

        <li style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={handleLogout}
            className="admin-nav-item"
            style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--danger)' }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}
