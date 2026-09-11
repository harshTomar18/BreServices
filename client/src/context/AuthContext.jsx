import { createContext, useContext, useState, useEffect } from 'react';
import { registerApi, loginApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Current logged in user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('directbizz_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('directbizz_token') || null;
  });

  // Admin user
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('directory_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && token) {
      localStorage.setItem('directbizz_user', JSON.stringify(currentUser));
      localStorage.setItem('directbizz_token', token);
    } else {
      localStorage.removeItem('directbizz_user');
      localStorage.removeItem('directbizz_token');
    }
  }, [currentUser, token]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('directory_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('directory_admin_user');
    }
  }, [adminUser]);

  // Real Backend User Registration (MongoDB Atlas)
  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const { user, token: jwtToken } = await registerApi({ name, email, password });
      setCurrentUser(user);
      setToken(jwtToken);
      setLoading(false);
      return user;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Real Backend User Login (MongoDB Atlas)
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const { user, token: jwtToken } = await loginApi({ email, password });
      setCurrentUser(user);
      setToken(jwtToken);

      // If user has admin role or email is admin@bre.com, also activate adminUser
      if (user.role === 'admin' || user.email === 'admin@bre.com') {
        const adminData = {
          name: user.name || 'BRE Admin',
          email: user.email,
          role: 'Super Admin',
          id: user.id || user._id,
        };
        setAdminUser(adminData);
      }

      setLoading(false);
      return user;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // User Logout
  const logoutUser = () => {
    setCurrentUser(null);
    setToken(null);
    setAdminUser(null);
  };

  // Admin Login
  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      // First try real backend API authentication
      const { user, token: jwtToken } = await loginApi({ email, password });
      if (user.role === 'admin' || user.email === 'admin@bre.com') {
        const adminData = {
          name: user.name || 'BRE Admin',
          email: user.email,
          role: 'Super Admin',
          id: user.id || user._id,
        };
        setAdminUser(adminData);
        setCurrentUser(user);
        setToken(jwtToken);
        setLoading(false);
        return adminData;
      } else {
        setLoading(false);
        throw new Error('Access denied. This account does not have administrative privileges.');
      }
    } catch (apiErr) {
      // Fallback local check if API has issues
      if (email === 'admin@bre.com' && password === 'admin123') {
        const admin = {
          name: 'BRE Admin',
          email: 'admin@bre.com',
          role: 'Super Admin',
        };
        setAdminUser(admin);
        setCurrentUser(admin);
        setLoading(false);
        return admin;
      }
      setLoading(false);
      throw apiErr;
    }
  };

  // Admin Logout
  const logoutAdmin = () => {
    setAdminUser(null);
    if (currentUser?.role === 'admin' || currentUser?.email === 'admin@bre.com') {
      setCurrentUser(null);
      setToken(null);
    }
  };

  const isAnyAdmin = Boolean(
    adminUser ||
    currentUser?.role === 'admin' ||
    currentUser?.email === 'admin@bre.com'
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        isUserAuthenticated: !!currentUser,
        registerUser,
        loginUser,
        logoutUser,

        adminUser,
        isAdminAuthenticated: isAnyAdmin,
        loginAdmin,
        logoutAdmin,

        // Backwards compatibility
        isAuthenticated: isAnyAdmin,
        login: loginAdmin,
        logout: logoutAdmin,

        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
