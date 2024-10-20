import api from "./api";

// Login function
export const login = async (credentials) => {
  const response = await api.post("http://127.0.0.1:8000/api/users/login", {
    username: credentials.username, 
    password: credentials.password, 
  });
  const { access_token } = response.data;
  localStorage.setItem("token", access_token);
  return response.data;
};

// Register function
export const register = async (userData) => {
  const response = await api.post("http://127.0.0.1:8000/api/users/register", {
    username: userData.username,
    email: userData.email,
    password_hash: userData.password, 
  });
  return response.data;
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
};

// Password reset function
export const resetPassword = async (email) => {
  const response = await api.post("http://127.0.0.1:8000/api/users/reset-password", { email });
  return response.data;
};

// Checking authentication status function
export const checkAuthStatus = async () => {
  try {
    await api.get("http://127.0.0.1:8000/api/users/profile");
    return true;
  } catch (error) {
    return false;
  }
};