import axiosInstance from "../axiosInstance";

export async function createProposelService(formData) {
  const { data } = await axiosInstance.post("/api/proposals/create", formData);
  return data;
}

export async function deleteProposalService(id) {
  const { data } = await axiosInstance.delete(`/api/proposals/${id}`);
  return data;
}

export async function getProposalByIdService(id) {
  const { data } = await axiosInstance.get(`/api/proposals/${id}`);
  return data;
}

export async function editProposalService(id, formData) {
  const { data } = await axiosInstance.put(`/api/proposals/${id}`, formData);
  return data;
}
