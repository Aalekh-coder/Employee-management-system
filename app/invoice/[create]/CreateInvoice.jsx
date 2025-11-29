"use client";
import CommonForm from "@/components/layout/Form";
import {
  createInviceFormControls,
  createServiceForInvoice,
} from "@/config/data";
import { initialInvoiceServiceFormData } from "@/config/initialFormDate";
import { getCustomerServices } from "@/service/customer";
import {
  createInvoiceService,
  createInvoiceServiceService,
  getAllinvoiceServices,
} from "@/service/invoice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateInvoice = ({ id }) => {
  const router = useRouter();

  const [invoiceFormData, setInvoiceFormData] = useState({
    taxType: "",
    invoiceDate: "",
    discount: "",
    discountPercentage: "",
  });
  const [clientDetails, setClientDetails] = useState({});

  const { Address, GSTIN, city, company, country, name, phone, tanNo, email } =
    clientDetails;

  const [serviceFormData, setServiceFormData] = useState(
    initialInvoiceServiceFormData
  );
  const [invoiceServiceItem, setInvoiceServiceItem] = useState([]);

  const [selectedServices, setSelectedServices] = useState([]);

  function calculationOfTotalAmount() {
    const totalServicePrice = selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );
    let priceAfterDiscount = totalServicePrice;

    if (invoiceFormData?.discountPercentage > 0) {
      const discountValue =
        (totalServicePrice * invoiceFormData?.discountPercentage) / 100;

      priceAfterDiscount = totalServicePrice - discountValue;
    } else if (invoiceFormData?.discount > 0) {
      priceAfterDiscount = totalServicePrice - invoiceFormData.discount;
    }

    if (tanNo) {
      priceAfterDiscount = priceAfterDiscount * 0.98;
    }

    const finalAmountWithGST = priceAfterDiscount * 1.18;
    return finalAmountWithGST;
  }

  const invoiceFormDate = {
    clientId: id,
    clientName: name,
    clientCompany: company,
    clientAddress: `${Address} -${city} -${country}`,
    GSTIN,
    tanNo,
    discount: invoiceFormData?.discount,
    discountPercentage: invoiceFormData?.discountPercentage,
    services: selectedServices.map(({ _id }) => _id),
    taxType: invoiceFormData?.taxType,
    invoiceDate: invoiceFormData?.invoiceDate,
    totalAmount: calculationOfTotalAmount(),
  };

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

  async function allInvoiceService() {
    const { data } = await getAllinvoiceServices();
    setInvoiceServiceItem(data);
  }

  //  that is main
  async function handleInvoiceFormSubmit(e) {
    e.preventDefault();

    // 1. Validate that at least one service is selected
    if (selectedServices?.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    // 2. Validate required form fields
    if (!invoiceFormData.invoiceDate || !invoiceFormData.taxType) {
      toast.error("Please fill in all required fields like Invoice Date and Tax Type.");
      return;
    }

    // 3. Validate discount fields
    if (
      invoiceFormData.discount &&
      invoiceFormData.discountPercentage
    ) {
      toast.error("Please use either a discount amount or a percentage, not both.");
      return;
    }

    if (invoiceFormData.discount < 0 || invoiceFormData.discountPercentage < 0) {
      toast.error("Discount values cannot be negative.");
      return;
    }

    const res = await createInvoiceService(invoiceFormDate);

    if (res.success) {
      toast.success("Invoice created successfully!");
      setSelectedServices([]);
      setInvoiceFormData({
        taxType: "",
        invoiceDate: "",
        discount: "",
        discountPercentage: "",
      });
      router.push(`/customer/${id}`);
    }
  }

  async function handleServiceFormSubmit(e) {
    e.preventDefault();
    try {
      const res = await createInvoiceServiceService(serviceFormData);
      if (res.success) toast.success(res.message);
      setServiceFormData(initialInvoiceServiceFormData);
      allInvoiceService();
    } catch (error) {
      console.log("error while create the service of invoice", error);
      toast.error(error.message || "error while creating the invoice service");
    }
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
    allInvoiceService();
  }, []);
  return (
    <div>
      <p className="font-bold text-2xl text-center">Create Invoice</p>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
        <div>
          <CommonForm
            formControls={createInviceFormControls}
            formData={invoiceFormData}
            setFormData={setInvoiceFormData}
            onSubmit={handleInvoiceFormSubmit}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3 border-t-2 mt-5">
            {invoiceServiceItem.map((item) => (
              <button
                key={item?._id}
                onClick={() => handleSelectService(item)}
                className={`group block rounded-lg p-4 border shadow-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500  ${
                  selectedServices.some((s) => s?._id === item?._id)
                    ? "bg-blue-100 border-blue-400"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <p className="font-semibold text-gray-800 capitalize group-hover:text-blue-600 transition-colors mt-5">
                    {item?.serviceName}
                  </p>
                </div>
                <div className="text-center">HSN CODE: {item?.HSN}</div>
                <div className="mt-2 text-lg text-black flex items-center font-bold gap-3 justify-center">
                  Price: ₹{item?.price?.toLocaleString("en-IN")}
                </div>
              </button>
            ))}
          </div>
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
