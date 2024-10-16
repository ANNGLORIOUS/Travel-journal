import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5555/api"; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding a request interceptor to include the JWT token in the header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API functions
export const getEntries = () => api.get("/entries");
export const getEntry = (id) => api.get(`/entries/${id}`);
export const createEntry = (data) => api.post("/entries", data); 
export const updateEntry = (id, data) => api.put(`/entries/${id}`, data);
export const deleteEntry = (id) => api.delete(`/entries/${id}`);
export const getEntryPhotos = (id) => api.get(`/entries/${id}/photos`);
export const uploadPhoto = (entryId, photoData) =>
  api.post(`/entries/${entryId}/photos`, photoData);

// Tag-related functions
export const getTags = () => api.get("/tags");
export const createTag = (tagName) => api.post("/tags", { name: tagName });
export const addTagToEntry = (entryId, tagId) =>
  api.post(`/entries/${entryId}/tags`, { tag_id: tagId });
export const removeTagFromEntry = (entryId, tagId) =>
  api.delete(`/entries/${entryId}/tags/${tagId}`);
export const deleteTag = (tagId) => api.delete(`/tags/${tagId}`);

// User-related functions
export const getUserProfile = () => api.get("/users/profile");

export default api;
