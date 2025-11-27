import axiosInstance from "../axiosInstance";

export async function createProposelService(formData) {
  const { data } = await axiosInstance.post("/api/proposals/create", formData);
  return data;
}