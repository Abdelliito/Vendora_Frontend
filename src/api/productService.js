import api from './axios';

export const productService = {
  // Get all products with optional filters
  getAllProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create product (Vendor only)
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Update product (Vendor only)
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (Vendor only)
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Get vendor's own products
  getMyProducts: async () => {
    const response = await api.get('/products/vendor/mine');
    return response.data;
  },
};
