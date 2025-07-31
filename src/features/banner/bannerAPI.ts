import api from "../api";

export const getBannerAPI = async () => {
  const res = await api.get("/banner");
  return res.data;
};
