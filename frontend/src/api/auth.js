import { apiClient } from "./client";

export const loginApi = (payload) => {
  return apiClient.post("/auth/login", payload).then(res => res.data);
};

export const registerApi = (payload) => {
  return apiClient.post("/auth/register", payload).then(res => res.data);
};
