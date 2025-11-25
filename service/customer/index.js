import axiosInstance from "../axiosInstance";

export async function getAllCustomerServices() {
  const { data } = await axiosInstance.get("/api/customer/get-all-customer");
  return data;
}
export async function createCustomerServices(formData) {
  const { data } = await axiosInstance.post("/api/customer/create",formData);
  return data;
}

export async function deleteCustomerServices(id) {
  const { data } = await axiosInstance.delete(`/api/customer/${id}`);
  return data;
}

export async function getCustomerServices(id) {
  const { data } = await axiosInstance.get(`/api/customer/${id}`);
  return data;
}
