import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// Auto login/register for demo purposes
export const initAuth = async () => {
  try {
    const res = await api.post('/auth/register', {
      name: 'Utkarsh',
      email: 'utkarsh@gmail.com',
      password: 'password123'
    });
    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (err) {
    try {
      const res = await api.post('/auth/authenticate', {
        email: 'utkarsh@gmail.com',
        password: 'password123'
      });
      localStorage.setItem('token', res.data.token);
      return res.data;
    } catch (e) {
      console.error("Auth failed", e);
    }
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProblems = () => api.get('/problems');
export const getProblemProgress = () => api.get('/problems/progress');
export const updateProblemProgress = (id, status) => api.post(`/problems/${id}/progress`, { status });

export const getVideos = () => api.get('/videos');
export const getVideoProgress = () => api.get('/videos/progress');
export const updateVideoProgress = (id, completed) => api.post(`/videos/${id}/complete`, { completed });
export const updateVideoNotes = (id, notes) => api.post(`/videos/${id}/notes`, { notes });

export default api;
