"use client";
import CommonForm from "@/components/layout/Form";
import Form from "@/components/layout/Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addProposalFormControl, ServiceFormControl } from "@/config/data";
import {
  initalServiceFormData,
  initialPerposelFormData,
  initialservicesFormData,
} from "@/config/initialFormDate";
import { createProposelService } from "@/service";
import { getCustomerServices } from "@/service/customer";
import { createServicesService } from "@/service/service";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Proposal = ({ customerId }) => {
  const [formData, setFormData] = useState(initialPerposelFormData);
  const [clientDetails, setClientDetails] = useState({});
  const { Address, GSTIN, city, company, country, name, phone } = clientDetails;

  // services
  const [serviceFormData, setServiceFormData] = useState(initalServiceFormData);

  async function handleService(e) {
    e.preventDefault()
    try {
      const response = await createServicesService(serviceFormData);
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.success(error.message);
    }
  }


  async function customerDetails() {
    try {
      const response = await getCustomerServices(customerId);
      if (response.success) {
        toast.success("customer details");
        setClientDetails(response.data);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }

  useEffect(() => {
    customerDetails();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl text-center my-5">Create Perposal</h1>
      <div className="grid grid-cols-2 gap-5 px-10 mt-5">
        <div>div1</div>

        <div className="flex flex-col gap-5">
          <div className="border flex flex-col p-6 rounded-lg shadow-md bg-gray-50">
            <h2 className="text-xl font-semibold mb-1 border-b pb-1 text-gray-700">
              Client Details
            </h2>
            <div className="space-y-1 text-gray-600">
              <p>
                <strong>Company:</strong> {company}
              </p>
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Phone:</strong> {phone}
              </p>
              <p>
                <strong>Address:</strong> {Address}, {city}, {country}
              </p>
              <p>
                <strong>GSTIN:</strong> {GSTIN}
              </p>
            </div>
          </div>

          <div>
            <CommonForm
              formControls={ServiceFormControl}
              formData={serviceFormData}
              setFormData={setServiceFormData}
              onSubmit={handleService}
              buttonText={"Add Service"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
