import api from "./api";

export const login = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  const { token } = response.data;
  localStorage.setItem("token", token);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const resetPassword = async (email) => {
  const response = await api.post("/users/reset-password", { email });
  return response.data;
};

export const checkAuthStatus = async () => {
  try {
    await api.get("/users/profile");
    return true;
  } catch (error) {
    return false;
  }
};
