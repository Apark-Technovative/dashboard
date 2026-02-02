import api from "./axios";

export const fetchJobApplications = ({
  keyword = "",
  sort = "-createdAt",
  page = 1,
  limit = 6,
}) => {
  return api.get("/getJobApplications", {
    params: {
      keyword,
      sort,
      page,
      limit,
    },
  });
};

export const fetchJobApplicationById = (id) => {
  return api.get(`/getJobApplication/${id}`);
};
