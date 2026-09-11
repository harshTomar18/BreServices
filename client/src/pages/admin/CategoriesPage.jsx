import { useState } from 'react';
import { useDirectory } from '../../context/DirectoryContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/common/Modal';
import { FolderTree, PlusCircle, Trash2, Tag, Layers, CheckCircle2 } from 'lucide-react';

export default function CategoriesPage() {
  const { categories, businesses, createCategory, deleteCategory } = useDirectory();
  const { addToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catIcon, setCatIcon] = useState('Folder');

  // Count businesses in each category
  const getCategoryCount = (categoryName) => {
    return businesses.filter(
      (b) => b.category.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    createCategory({
      name: catName,
      description: catDesc,
      icon: catIcon,
    });

    addToast(`Category "${catName}" created successfully!`, 'success');
    setCatName('');
    setCatDesc('');
    setModalOpen(false);
  };

  const handleDelete = (category) => {
    const count = getCategoryCount(category.name);
    if (count > 0) {
      if (
        !window.confirm(
          `This category has ${count} assigned businesses. Are you sure you want to delete it?`
        )
      ) {
        return;
      }
    }
    deleteCategory(category.id);
    addToast(`Category "${category.name}" removed`, 'info');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>Categories Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Organize directory taxonomy, industry sectors, and classification tags.
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn btn-primary">
          <PlusCircle size={16} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Table Card */}
      <div className="data-table-card">
        <div className="table-toolbar">
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Registered Industry Sectors</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Total of {categories.length} active classifications
            </p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Description</th>
                <th>Assigned Businesses</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => {
                const count = getCategoryCount(cat.name);
                return (
                  <tr key={cat.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--primary-subtle)',
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Tag size={16} />
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {cat.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '360px' }}>
                      {cat.description || 'No description provided.'}
                    </td>
                    <td>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: count > 0 ? 'var(--primary)' : 'var(--text-muted)',
                        }}
                      >
                        {count} {count === 1 ? 'Business' : 'Businesses'}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-active">
                        active
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleDelete(cat)}
                          className="btn-icon btn-icon-danger"
                          title="Delete Category"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Category">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">
              Category Name <span className="req">*</span>
            </label>
            <input
              type="text"
              required
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              placeholder="e.g. Legal & Consulting"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              rows="3"
              value={catDesc}
              onChange={(e) => setCatDesc(e.target.value)}
              placeholder="Short description of services under this classification..."
              className="form-textarea"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
