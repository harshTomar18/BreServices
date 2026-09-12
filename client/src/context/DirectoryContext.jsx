import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchBusinessesApi,
  fetchCategoriesApi,
  createBusinessApi,
  updateBusinessApi,
  deleteBusinessApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from '../services/api';

const DirectoryContext = createContext(null);

export function DirectoryProvider({ children }) {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load real business directory and categories from backend MongoDB
  const loadDirectoryData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [bizData, catData] = await Promise.all([
        fetchBusinessesApi(),
        fetchCategoriesApi().catch(() => []),
      ]);

      if (bizData && bizData.businesses) {
        setBusinesses(bizData.businesses);
        setTotalCount(bizData.totalActive || bizData.total || bizData.businesses.length);
        if (bizData.categoryCounts) {
          setCategoryCounts(bizData.categoryCounts);
        }
        if (bizData.cities && Array.isArray(bizData.cities)) {
          setCities(bizData.cities);
        }
        if (bizData.locations && Array.isArray(bizData.locations)) {
          setLocations(bizData.locations);
        }
      }

      if (Array.isArray(catData) && catData.length > 0) {
        setCategories(catData);
      }
    } catch (err) {
      console.error('Failed to load directory data from backend:', err);
      setError(err.message || 'Failed to connect to backend server');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDirectoryData();
  }, [loadDirectoryData]);

  // Business CRUD operations backed by MongoDB
  const getBusinessById = (id) => {
    return businesses.find((b) => b.id === id || b._id === id);
  };

  const createBusiness = async (data) => {
    try {
      const created = await createBusinessApi(data);
      setBusinesses((prev) => [created, ...prev]);
      setTotalCount((prev) => prev + 1);
      return created;
    } catch (err) {
      console.error('Error creating business in MongoDB:', err);
      throw err;
    }
  };

  const updateBusiness = async (id, data) => {
    try {
      const updated = await updateBusinessApi(id, data);
      setBusinesses((prev) =>
        prev.map((b) => (b.id === id || b._id === id ? { ...b, ...updated } : b))
      );
      return updated;
    } catch (err) {
      console.error('Error updating business in MongoDB:', err);
      throw err;
    }
  };

  const deleteBusiness = async (id) => {
    try {
      await deleteBusinessApi(id);
      setBusinesses((prev) => prev.filter((b) => b.id !== id && b._id !== id));
      setTotalCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error deleting business from MongoDB:', err);
      throw err;
    }
  };

  // Category CRUD operations backed by MongoDB
  const createCategory = async (data) => {
    try {
      const created = await createCategoryApi(data);
      setCategories((prev) => [...prev, created]);
      return created;
    } catch (err) {
      console.error('Error creating category in MongoDB:', err);
      throw err;
    }
  };

  const updateCategory = async (id, data) => {
    try {
      const updated = await updateCategoryApi(id, data);
      setCategories((prev) =>
        prev.map((c) => (c.id === id || c._id === id ? { ...c, ...updated } : c))
      );

      // If category name was renamed, instantly update businesses in local state!
      if (updated.oldName && updated.name) {
        setBusinesses((prev) =>
          prev.map((b) =>
            b.category?.toLowerCase() === updated.oldName.toLowerCase()
              ? { ...b, category: updated.name }
              : b
          )
        );
      }

      // Background reload to sync aggregated counts
      loadDirectoryData();
      return updated;
    } catch (err) {
      console.error('Error updating category in MongoDB:', err);
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await deleteCategoryApi(id);
      setCategories((prev) => prev.filter((c) => c.id !== id && c._id !== id));
      loadDirectoryData();
    } catch (err) {
      console.error('Error deleting category from MongoDB:', err);
      throw err;
    }
  };

  const refreshData = () => {
    return loadDirectoryData();
  };

  return (
    <DirectoryContext.Provider
      value={{
        businesses,
        categories,
        categoryCounts,
        cities,
        locations,
        totalCount,
        isLoading,
        error,
        getBusinessById,
        createBusiness,
        updateBusiness,
        deleteBusiness,
        createCategory,
        updateCategory,
        deleteCategory,
        refreshData,
      }}
    >
      {children}
    </DirectoryContext.Provider>
  );
}

export function useDirectory() {
  const context = useContext(DirectoryContext);
  if (!context) {
    throw new Error('useDirectory must be used within a DirectoryProvider');
  }
  return context;
}
