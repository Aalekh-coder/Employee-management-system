import axiosInstance from "../axiosInstance";

export async function createServicesService(formData) {
  const { data } = await axiosInstance.post("/api/service/add", formData);
  return data;
}
