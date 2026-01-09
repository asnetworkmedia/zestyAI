import axios from 'axios';

// Determine the base URL for the API
const baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:1235';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL
});

// API functions
export const fetchProperties = async () => {
  const { data } = await api.get('/properties');
  return data;
};

// Fetch a single property by ID
export const fetchPropertyById = async (id) => {
  const { data } = await api.get(`/properties/${id}`);
  return data;
};

// Search properties by coordinates
export const searchByCoordinates = async (payload) => {
  const { data } = await api.post('/find', payload);
  return data;
};

// Fetch API health status
export const fetchHealth = async () => {
  const { data } = await api.get('/health');
  return data?.status === 'ok';
}

// Build image URL with optional overlay parameters
export const buildImageUrl = (id, { overlay = false, parcel = 'orange', building = 'green' } = {}) => {
  const url = new URL(`${baseURL}/display/${id}`);
  if (overlay) {
    url.searchParams.set('overlay', 'yes');
    url.searchParams.set('parcel', parcel);
    url.searchParams.set('building', building);
  }
  return url.toString();
};

export default api;
