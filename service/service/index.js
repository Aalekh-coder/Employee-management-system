import axiosInstance from "../axiosInstance";

export async function createServicesService(formData) {
  const { data } = await axiosInstance.post("/api/service/add", formData);
  return data;
}

export async function getAllService() {
  const { data } = await axiosInstance.get("/api/service/getAllService");
  return data;
}
