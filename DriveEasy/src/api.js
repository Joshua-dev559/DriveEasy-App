import axios from "axios";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser  = (data) => api.post("/auth/register", data).then((r) => r.data);
export const loginUser     = (data) => api.post("/auth/login", data).then((r) => r.data);
export const getCars       = ()     => api.get("/cars").then((r) => r.data);
export const getBookings   = ()     => api.get("/bookings").then((r) => r.data);
export const createBooking = (data) => api.post("/bookings", data).then((r) => r.data);
export const cancelBooking = (id)   => api.delete(`/bookings/${id}`);
