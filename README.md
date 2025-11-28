  async function fetchProposalDataForEdit(id) {
    try {
      const response = await getProposalByIdService(id);
      console.log(response.data);
      if (response.success) {
        toast.success("fetch Data for edite");
        setEditProposalsData(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something error while edit proposal");
    }
  }