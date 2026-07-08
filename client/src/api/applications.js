import api from "./axios-instance";

export const getStatsRequest = () => {
  return api.get("/applications/stats");
};

export const getApplicationsRequest = () => {
  return api.get("/applications");
};

export const addApplicationRequest = (application) => {
  return api.post("/applications", application);
};

export const updateApplicationRequest = (id, changes) => {
  return api.put(`/applications/${id}`, changes);
};

export const deleteApplicationRequest = (id) => {
  return api.delete(`/applications/${id}`);
};
