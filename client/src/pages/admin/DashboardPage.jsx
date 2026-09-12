import { Link } from 'react-router-dom';
import { useDirectory } from '../../context/DirectoryContext';
import StatsCard from '../../components/admin/StatsCard';
import {
  Building2,
  CheckCircle2,
  FolderTree,
  Clock,
  PlusCircle,
  Edit
} from 'lucide-react';

export default function DashboardPage() {
  const { businesses, categories } = useDirectory();

  const totalBusinesses = businesses.length;
  const activeBusinesses = businesses.filter((b) => b.status === 'active').length;
  const totalCategories = categories.length;

  // Recently added businesses (sorted by createdAt or reverse order)
  const recentBusinesses = [...businesses].slice(0, 5);

  return (
    <div>
      {/* Header with Title & Quick Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            System statistics and recent activity across directory listings.
          </p>
        </div>

        <div>
          <Link to="/admin/businesses/add" className="btn btn-primary">
            <PlusCircle size={16} />
            <span>Add New Business</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="stats-grid">
        <StatsCard
          title="Total Listings"
          value={totalBusinesses}
          icon={Building2}
          color="primary"
          change="All registered listings"
        />
        <StatsCard
          title="Active Listings"
          value={activeBusinesses}
          icon={CheckCircle2}
          color="success"
          change={`${Math.round((activeBusinesses / (totalBusinesses || 1)) * 100)}% published live`}
        />
        <StatsCard
          title="Categories"
          value={totalCategories}
          icon={FolderTree}
          color="warning"
          change="Industry categories"
        />
        <StatsCard
          title="Recent Additions"
          value={recentBusinesses.length}
          icon={Clock}
          color="info"
          change="Latest updates"
        />
      </div>

      {/* Recently Added Businesses Table */}
      <div className="data-table-card">
        <div className="table-toolbar">
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Recently Added Businesses</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Most recent corporate profiles added to the platform
            </p>
          </div>
          <Link to="/admin/businesses" className="btn btn-secondary btn-sm">
            View All ({totalBusinesses})
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Business Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Created Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentBusinesses.map((biz) => (
                <tr key={biz.id}>
                  <td style={{ fontWeight: 600 }}>{biz.name}</td>
                  <td>
                    <span className="badge badge-category">{biz.category}</span>
                  </td>
                  <td>{biz.location}</td>
                  <td>{biz.phone}</td>
                  <td>
                    <span className={`badge ${biz.status === 'active' ? 'badge-active' : 'badge-draft'}`}>
                      {biz.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {biz.createdAt}
                  </td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <Link
                        to={`/admin/businesses/${biz.id}/edit`}
                        className="btn-icon"
                        title="Edit Business"
                      >
                        <Edit size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
