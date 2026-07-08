import api from "./axios-instance";

export const loginRequest = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const registerRequest = (credentials) => {
  return api.post("/auth/register", credentials);
};
