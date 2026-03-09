import api from './axios';

export const vendorService = {
  // Get all vendors
  getAllVendors: async () => {
    const response = await api.get('/vendors');
    return response.data;
  },

  // Get vendor by ID
  getVendorById: async (id) => {
    const response = await api.get(`/vendors/${id}`);
    return response.data;
  },
};
