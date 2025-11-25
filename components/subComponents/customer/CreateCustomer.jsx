"use client";

import CommonForm from "@/components/layout/Form";
import { addCustomerFormControl } from "@/config/data";
import { initalCustomerFormData } from "@/config/initialFormDate";
import { useState } from "react";

const CreateCustomer = () => {
  const [formData, setFormData] = useState(initalCustomerFormData);

  const handleCustomer = () => {};
  return (
    <div className="overflow-y-scroll">
      <p className="font-semibold text-center text-2xl pb-5">Create New Client</p>
      <CommonForm
        formData={formData}
        setFormData={setFormData}
        formControls={addCustomerFormControl}
        buttonText={"Add Client"}
        onSubmit={handleCustomer}
      />
    </div>
  );
};

export default CreateCustomer;
