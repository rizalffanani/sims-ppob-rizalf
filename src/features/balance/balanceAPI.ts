import api from "../api";

export const getBalanceAPI = async () => {
  const res = await api.get("/balance");
  return res.data;
};

export const topUpBalance = async (payload: { top_up_amount: number }) => {
  const res = await api.post("/topup", payload);
  return res.data;
};
