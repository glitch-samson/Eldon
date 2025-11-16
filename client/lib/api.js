const API_BASE_URL = 'https://wedding-site-backend-y4z1.onrender.com';

// Token management
const getToken = () => localStorage.getItem('adminToken');
const setToken = (token) => localStorage.setItem('adminToken', token);
const clearToken = () => localStorage.removeItem('adminToken');

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || `API Error: ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Authentication endpoints
export const authApi = {
  login: async (password) => {
    const response = await apiRequest('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    if (response.token) {
      setToken(response.token);
    }
    return response;
  },

  logout: async () => {
    try {
      const response = await apiRequest('/admin/logout', {
        method: 'POST',
      });
      clearToken();
      return response;
    } catch (error) {
      clearToken();
      throw error;
    }
  },

  isLoggedIn: () => !!getToken(),
  getToken,
  setToken,
  clearToken,
};

// Media endpoints
export const mediaApi = {
  // Get all media with pagination and filters
  getAll: async (options = {}) => {
    const { page = 1, limit = 20, type, search } = options;
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (type) params.append('type', type);
    if (search) params.append('search', search);

    return apiRequest(`/media?${params.toString()}`);
  },

  // Get single media by ID
  getById: async (id) => {
    return apiRequest(`/media/${id}`);
  },

  // Upload media files
  upload: async (files, caption = '') => {
    const formData = new FormData();
    
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    } else {
      formData.append('files', files);
    }
    
    if (caption) {
      formData.append('caption', caption);
    }

    const token = getToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/media/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || `Upload Error: ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Media Upload Error:', error);
      throw error;
    }
  },

  // Update media caption
  updateCaption: async (id, caption) => {
    return apiRequest(`/media/${id}/caption`, {
      method: 'PATCH',
      body: JSON.stringify({ caption }),
    });
  },

  // Delete media
  delete: async (id) => {
    return apiRequest(`/media/${id}`, {
      method: 'DELETE',
    });
  },

  // Download all media as ZIP
  downloadZip: async (type = null) => {
    const params = new URLSearchParams();
    if (type) params.append('type', type);

    const token = getToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/media/download/zip?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `media-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      console.error('ZIP Download Error:', error);
      throw error;
    }
  },
};

// System endpoints
export const systemApi = {
  health: async () => {
    return apiRequest('/health');
  },
};

export default {
  authApi,
  mediaApi,
  systemApi,
};
