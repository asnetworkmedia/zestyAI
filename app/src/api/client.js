import axios from 'axios';

const baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:1235';

const api = axios.create({
  baseURL
});

export const fetchProperties = async () => {
  const { data } = await api.get('/properties');
  return data;
};

export const fetchPropertyById = async (id) => {
  const { data } = await api.get(`/properties/${id}`);
  return data;
};

export const searchByCoordinates = async (payload) => {
  const { data } = await api.post('/properties/find', payload);
  return data;
};

export const fetchHealth = async () => {
  const { data } = await api.get('/health');
  return data?.status === 'ok';
}

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
