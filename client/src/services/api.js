/**
 * Unified API Client for backend communication
 */
const API_BASE_URL = `${import.meta.env.VITE_API_URL || ''}/api/v1`;

export async function fetchHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.statusText}`);
  }
  return response.json();
}

export async function registerApi({ name, email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Registration failed');
  }
  return data.data; // { user, token }
}

export async function loginApi({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    const error = new Error(data.message || 'Login failed');
    error.statusCode = data.statusCode || response.status;
    throw error;
  }
  return data.data; // { user, token }
}

export async function fetchMeApi(token) {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to retrieve profile');
  }
  return data.data;
}

/**
 * Upload a single image file to Cloudinary via backend
 * @param {File} file - The file object from <input type="file" />
 * @param {string} [folder] - Optional folder name in Cloudinary
 * @returns {Promise<{ url: string, secure_url: string, public_id: string }>}
 */
export async function uploadImageApi(file, folder = 'bre_services') {
  const formData = new FormData();
  formData.append('image', file);
  if (folder) {
    formData.append('folder', folder);
  }

  const response = await fetch(`${API_BASE_URL}/upload/image`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Image upload failed');
  }
  return data.data;
}

/**
 * Upload multiple images to Cloudinary via backend
 * @param {FileList|File[]} files - List of image files
 * @param {string} [folder] - Optional folder name
 * @returns {Promise<Array<{ url: string, secure_url: string, public_id: string }>>}
 */
export async function uploadMultipleImagesApi(files, folder = 'bre_services') {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append('images', file);
  });
  if (folder) {
    formData.append('folder', folder);
  }

  const response = await fetch(`${API_BASE_URL}/upload/images`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Multiple image upload failed');
  }
  return data.data;
}

/**
 * Fetch businesses from backend MongoDB API
 * @param {Object} [params] - Query parameters
 * @returns {Promise<{ businesses: Array, total: number, totalActive: number, categoryCounts: Object }>}
 */
export async function fetchBusinessesApi(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      searchParams.append(key, val);
    }
  });

  const queryString = searchParams.toString();
  const url = `${API_BASE_URL}/businesses${queryString ? `?${queryString}` : ''}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch businesses from server');
  }

  return data.data;
}

/**
 * Fetch a single business by ID from backend MongoDB API
 * @param {string} id
 */
export async function fetchBusinessByIdApi(id) {
  const response = await fetch(`${API_BASE_URL}/businesses/${id}`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Business not found');
  }

  return data.data;
}

/**
 * Create a new business in backend MongoDB
 * @param {Object} businessData
 */
export async function createBusinessApi(businessData) {
  const response = await fetch(`${API_BASE_URL}/businesses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(businessData),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to create business');
  }

  return data.data;
}

/**
 * Update business in backend MongoDB
 * @param {string} id
 * @param {Object} businessData
 */
export async function updateBusinessApi(id, businessData) {
  const response = await fetch(`${API_BASE_URL}/businesses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(businessData),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to update business');
  }

  return data.data;
}

/**
 * Delete business in backend MongoDB
 * @param {string} id
 */
export async function deleteBusinessApi(id) {
  const response = await fetch(`${API_BASE_URL}/businesses/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete business');
  }

  return data.data;
}

/**
 * Fetch categories from backend MongoDB API
 */
export async function fetchCategoriesApi() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch categories');
  }

  return data.data;
}


