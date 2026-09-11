import Modal from '../common/Modal';
import { AlertTriangle } from 'lucide-react';

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Business',
  itemName = 'this business',
  loading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', margin: '0.5rem 0 1.5rem' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--danger-bg)',
            color: 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AlertTriangle size={20} />
        </div>
        <div>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            Are you sure you want to delete &ldquo;{itemName}&rdquo;?
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            This action cannot be undone. The listing will be immediately removed from the public directory and search results.
          </p>
        </div>
      </div>

      <div className="modal-actions">
        <button
          onClick={onClose}
          disabled={loading}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="btn btn-danger"
        >
          {loading ? 'Deleting...' : 'Delete Listing'}
        </button>
      </div>
    </Modal>
  );
}
