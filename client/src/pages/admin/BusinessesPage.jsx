import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDirectory } from '../../context/DirectoryContext';
import { useToast } from '../../context/ToastContext';
import DeleteModal from '../../components/admin/DeleteModal';
import Pagination from '../../components/common/Pagination';
import {
  PlusCircle,
  Search,
  Eye,
  Edit,
  Trash2,
  Filter,
  RotateCcw
} from 'lucide-react';

const ITEMS_PER_PAGE = 7;

export default function BusinessesPage() {
  const { businesses, categories, deleteBusiness } = useDirectory();
  const { addToast } = useToast();

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filtered businesses
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      // Search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matches =
          b.name.toLowerCase().includes(term) ||
          b.location.toLowerCase().includes(term) ||
          b.phone.includes(term) ||
          b.category.toLowerCase().includes(term);
        if (!matches) return false;
      }

      // Category
      if (categoryFilter && b.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }

      // Status
      if (statusFilter && b.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [businesses, searchTerm, categoryFilter, statusFilter]);

  // Pagination calculation
  const totalItems = filteredBusinesses.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const pageIndex = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedBusinesses = useMemo(() => {
    const startIndex = (pageIndex - 1) * ITEMS_PER_PAGE;
    return filteredBusinesses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBusinesses, pageIndex]);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    setTimeout(() => {
      deleteBusiness(deleteTarget.id);
      addToast(`"${deleteTarget.name}" was successfully deleted`, 'success');
      setDeleteLoading(false);
      setDeleteTarget(null);
    }, 400);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  const hasActiveFilters = Boolean(searchTerm || categoryFilter || statusFilter);

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>Manage Businesses</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Search, filter, edit, or remove commercial listings from the directory.
          </p>
        </div>

        <Link to="/admin/businesses/add" className="btn btn-primary">
          <PlusCircle size={16} />
          <span>Add New Business</span>
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="data-table-card">
        {/* Table Toolbar */}
        <div className="table-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '240px', maxWidth: '360px', flex: 1 }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search name, phone, city..."
                className="form-input"
                style={{ paddingLeft: '2.35rem', paddingRight: '0.75rem', height: '38px', fontSize: '0.88rem' }}
              />
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="form-select"
              style={{ width: 'auto', minWidth: '160px', height: '38px', fontSize: '0.88rem' }}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="form-select"
              style={{ width: 'auto', minWidth: '130px', height: '38px', fontSize: '0.88rem' }}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft / Inactive</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="btn btn-secondary btn-sm"
                title="Reset filters"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
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
              {paginatedBusinesses.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      No business listings match your query.
                    </div>
                    {hasActiveFilters && (
                      <button
                        onClick={handleResetFilters}
                        className="btn btn-secondary btn-sm"
                        style={{ marginTop: '0.75rem' }}
                      >
                        Clear Filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedBusinesses.map((biz) => (
                  <tr key={biz.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {biz.image ? (
                          <img
                            src={biz.image}
                            alt=""
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '6px',
                              objectFit: 'cover',
                              flexShrink: 0,
                              border: '1px solid var(--border-subtle)',
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--bg-subtle)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--text-muted)',
                              flexShrink: 0,
                              fontSize: '1rem',
                            }}
                          >
                            🏢
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{biz.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{biz.email || biz.location}</div>
                        </div>
                      </div>
                    </td>
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
                          to={`/business/${biz.id}`}
                          target="_blank"
                          className="btn-icon"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </Link>
                        <Link
                          to={`/admin/businesses/${biz.id}/edit`}
                          className="btn-icon"
                          title="Edit Listing"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(biz)}
                          className="btn-icon btn-icon-danger"
                          title="Delete Listing"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={pageIndex}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deleteTarget?.name}
        loading={deleteLoading}
      />
    </div>
  );
}
