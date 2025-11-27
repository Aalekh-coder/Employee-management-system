"use client";
import CommonForm from "@/components/layout/Form";
import { ServiceFormControl, addProposalFormControl } from "@/config/data";
import {
  initalServiceFormData,
  initialPerposelFormData,
} from "@/config/initialFormDate";
import { getCustomerServices } from "@/service/customer";
import { createProposelService } from "@/service/proposal";
import { createServicesService, getAllService } from "@/service/service";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Proposal = ({ customerId }) => {
  const [formData, setFormData] = useState(initialPerposelFormData);
  const [servicesItem, setServicesItem] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [clientDetails, setClientDetails] = useState({});

  const [serviceCreateSucess, setServiceCreateSucess] = useState("");

  const { Address, GSTIN, city, company, country, name, phone, tanNo, email } =
    clientDetails;

  // services
  const [serviceFormData, setServiceFormData] = useState(initalServiceFormData);

  function calculationOfTotalAmount() {
    const totalServicePrice = selectedServices.reduce(
      (total, service) => total + service.amount,
      0
    );

    let priceAfterDiscount = totalServicePrice;

    if (formData?.discountPercentage > 0) {
      const discountValue =
        (totalServicePrice * Number(formData.discountPercentage)) / 100;
      priceAfterDiscount = totalServicePrice - discountValue;
    } else if (formData?.discount > 0) {
      priceAfterDiscount = totalServicePrice - Number(formData.discount);
    }

    // Apply additional 2% reduction if tanNo exists
    if (tanNo) {
      priceAfterDiscount = priceAfterDiscount * 0.98; // Reduce by 2%
    }

    // Add 18% GST
    const finalAmountWithGST = priceAfterDiscount * 1.18;

    return finalAmountWithGST;
  }


  const propsalAllItemForm = {
    clientId: customerId,
    clientName: name,
    clientCompany: company,
    clientAddress: `${Address} -${city} -${country}`,
    GSTIN,
    tanNo: tanNo,
    services: selectedServices.map(({ _id }) => _id),
    discount: formData?.discount || 0,
    discountPercentage: formData?.discountPercentage || 0,
    validTill: formData?.validTill,
    paymentMethod: formData?.paymentMethod,
    totalAmount: calculationOfTotalAmount(),
  };

  async function fetchAllServices() {
    try {
      const response = await getAllService();
      if (response.success) {
        setServicesItem(response.data);
        toast.success("All Services Fetched");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async function handleService(e) {
    e.preventDefault();

    try {
      if (
        !serviceFormData.serviceTitle ||
        !serviceFormData.amount ||
        !serviceFormData.duration
      ) {
        toast.error("please fill the service details");
      }
      const response = await createServicesService(serviceFormData);
      if (response.success) {
        toast.success(response.message);
        setServiceFormData(initalServiceFormData);
        setServiceCreateSucess("done");
      }
    } catch (error) {
      console.log(error);
      toast.success(error.message);
    }
  }

  async function handleProposalSubmit(e) {
    e.preventDefault();

    try {
      if (formData?.discount > 0 && formData?.discountPercentage > 0) {
        toast.error(
          "Please use either a fixed discount or a percentage, not both."
        );
        return;
      }

      if (!formData.paymentMethod || !formData.validTill) {
        toast.error(
          "Payment method and 'Valid Till' date are required to create the proposal."
        );
        return;
      }

      if (propsalAllItemForm.services.length === 0) {
        toast.error("Please add at least one service to the proposal.");
        return;
      }

      const response = await createProposelService(propsalAllItemForm);
      if (response.success) {
        toast.success("Proposal created successfully!");
        setFormData(initialPerposelFormData);
        setSelectedServices([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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

  useEffect(() => {
    fetchAllServices();
  }, [serviceCreateSucess]);

  const handleSelectService = (service) => {
    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.some((s) => s._id === service._id);
      if (isSelected) {
        return prevSelected.filter((s) => s._id !== service._id);
      } else {
        return [...prevSelected, service];
      }
    });
  };

  useEffect(() => {
    const serviceIds = selectedServices.map((s) => s._id);
    setFormData((prev) => ({ ...prev, services: serviceIds }));
  }, [selectedServices]);

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl text-center my-5">Create Perposal</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-10 mt-5">
        <div>
          <CommonForm
            formControls={addProposalFormControl}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleProposalSubmit}
            buttonText={"Create Proposal"}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3 ">
            {servicesItem.map((item) => (
              <button
                key={item?._id}
                onClick={() => handleSelectService(item)}
                className={`group block rounded-lg p-4 border shadow-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  selectedServices.some((s) => s?._id === item?._id)
                    ? "bg-blue-100 border-blue-400"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item?.serviceTitle}
                  </p>
                </div>
                <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                  <span>{item?.duration}</span>
                  <span className="font-bold text-gray-700">
                    ₹ {item?.amount?.toLocaleString("en-IN")}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

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
