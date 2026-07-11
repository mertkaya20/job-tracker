import api from "./axios-instance";

export const changePasswordRequest = (data) => {
  return api.put("/users/change-password", data);
};
