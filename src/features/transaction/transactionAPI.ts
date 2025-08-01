import api from "../api"; // axios instance dengan token interceptor

export const getHistoryTransactionAPI = async (
  offset: string,
  limit: string
) => {
  const res = await api.get("/transaction/history", {
    params: { offset, limit },
  });
  return res.data;
};

export const newTransactionAPI = async (payload: { service_code: string }) => {
  const res = await api.post("/transaction", payload);
  return res.data;
};
