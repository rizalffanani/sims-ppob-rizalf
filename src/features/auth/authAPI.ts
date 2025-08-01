import api from "../api";

export const loginAPI = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const registerAPI = async (
  email: string,
  first_name: string,
  last_name: string,
  password: string
) => {
  const res = await api.post("/registration", {
    email,
    first_name,
    last_name,
    password,
  });
  return res.data;
};

export const getProfileAPI = async () => {
  const res = await api.get("/profile");
  return res.data;
};

export const updateProfile = async (payload: {
  first_name: string;
  last_name: string;
}) => {
  const res = await api.put("/profile/update", payload);
  return res.data;
};

export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.put("/profile/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
