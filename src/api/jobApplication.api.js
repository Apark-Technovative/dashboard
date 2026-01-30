import api from "./axios";

export const fetchJobApplications = () => {
  return api.get("/getJobApplications");
};

export const fetchJobApplicationById = (id) => {
  return api.get(`/getJobApplication/${id}`);
};
