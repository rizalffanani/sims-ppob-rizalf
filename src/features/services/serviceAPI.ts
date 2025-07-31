import api from "../api"; // axios instance dengan token interceptor

export const getServicesAPI = async () => {
  const res = await api.get("/services");
  return res.data;
};
