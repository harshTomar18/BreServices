import { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const addToast = (message, type = 'info', options = {}) => {
    switch (type) {
      case 'success':
        return toast.success(message, options);
      case 'error':
        return toast.error(message, options);
      case 'warning':
      case 'warn':
        return toast.warn(message, options);
      case 'info':
      default:
        return toast.info(message, options);
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, toast }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { toast };
