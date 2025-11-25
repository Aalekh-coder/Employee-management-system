import axiosInstance from "../axiosInstance";

export async function getAllCustomerServices() {
  const { data } = await axiosInstance.get("/api/customer/get-all-customer");
  return data;
}
