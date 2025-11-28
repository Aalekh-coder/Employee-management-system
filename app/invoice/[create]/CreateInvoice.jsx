"use client";
import CommonForm from "@/components/layout/Form";
import {
  createInviceFormControls,
  createServiceForInvoice,
} from "@/config/data";
import { initialInvoiceServiceFormData } from "@/config/initialFormDate";
import { getCustomerServices } from "@/service/customer";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateInvoice = ({id}) => {

    console.log(id,"id");
  const [invoiceFormData, setInvoiceFormData] = useState({
    taxType: "",
    invoiceDate: "",
  });
  const [clientDetails, setClientDetails] = useState({});

  const { Address, GSTIN, city, company, country, name, phone, tanNo, email } =
    clientDetails;

  const [serviceFormData, setServiceFormData] = useState(
    initialInvoiceServiceFormData
  );

  async function handleInvoiceFormSubmit(e) {
    e.preventDefault();
  }

  async function handleServiceFormSubmit(e) {
    e.preventDefault();
  }

  async function customerDetails() {
    try {
      const response = await getCustomerServices(id);
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
  return (
    <div>
      <p className="font-bold text-2xl text-center">Create Invoice</p>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <CommonForm
            formControls={createInviceFormControls}
            formData={invoiceFormData}
            setFormData={setInvoiceFormData}
            onSubmit={handleInvoiceFormSubmit}
          />
        </div>

        <div className="flex flex-col mt-10 gap-5">
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
                <strong>TAN NO:</strong> {tanNo || "NA"}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Address:</strong> {Address}, {city}, {country}
              </p>
              <p>
                <strong>GSTIN:</strong> {GSTIN}
              </p>
            </div>
          </div>

          <CommonForm
            formControls={createServiceForInvoice}
            formData={serviceFormData}
            setFormData={setServiceFormData}
            onSubmit={handleServiceFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
