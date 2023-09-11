import axios from "axios";
import { BASE_API } from "./apiEndpoints";

const publicAPI = axios.create({
  baseURL: BASE_API,
});

const privateAPI = axios.create({
  baseURL: BASE_API,
});

privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPublicData = (endpoint, params = {}) => {
  return publicAPI.get(endpoint, { params });
};

export const getPrivateData = (endpoint, params = {}) => {
  return privateAPI.get(endpoint, { params });
};

export const postPrivateData = (endpoint, formData) => {
  return privateAPI.post(endpoint, formData);
};

export const putPrivateData = (endpoint, data) => {
  return privateAPI.put(endpoint, data);
};

export const deletePrivateData = (endpoint) => {
  return privateAPI.delete(endpoint);
};
