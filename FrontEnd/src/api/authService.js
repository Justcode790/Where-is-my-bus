// services/authService.js
import API from "./axios";

// Register user
export const registerUser = async (formData) => {
  const { data } = await API.post("/register", formData);
  return data; // { user, token }
};

// Login user
export const loginUser = async (formData) => {
  const { data } = await API.post("/login", formData);
  return data; // { user, token }
};


export const getCurrentUser = async () => {
  const { data } = await API.get("/me");
  return data; // { user }
};

// Logout (optional backend call)
export const logoutUser = async () => {
  return Promise.resolve({ message: "Logged out successfully" });
};
