import axios from "axios";

// Update baseURL to point to your backend
const api = axios.create({
  baseURL: "http://localhost:5000", // Development backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add signup-specific endpoints
api.signup = {
  email: (email) => api.post("/auth/signup/email", { email }),
  verifyOTP: (data) => api.post("/auth/signup/verify-otp", data),
  createSite: (data) => api.post("/auth/signup/create-site", data),
  checkSubdomain: (name) => api.get(`/auth/subdomain/check?name=${name}`)
};

export default api;