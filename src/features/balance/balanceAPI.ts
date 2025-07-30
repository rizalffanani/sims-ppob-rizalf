import api from "../api";

export const getBalanceAPI = async () => {
  const res = await api.get("/balance");
  return res.data;
};
