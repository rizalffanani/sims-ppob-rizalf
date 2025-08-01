import api from "../api";

export const getBalanceAPI = async () => {
  const res = await api.get("/balance");
  return res.data;
};

export const topUp = async (amount: number) => {
  const res = await api.post("/topup", { top_up_amount: amount });
  return res.data;
};

export const getTransactionHistory = async () => {
  const res = await api.get("/transaction/history");
  return res.data;
};
