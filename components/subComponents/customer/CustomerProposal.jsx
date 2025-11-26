"use client";

import { getAllProposalCustomer } from "@/service/customer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CustomerProposal = ({ customerId }) => {
  const [listPropoasls, setListPropoasls] = useState([]);

  async function getAllCustomerPropsals() {
    try {
      const allPropsals = await getAllProposalCustomer(customerId);
      console.log(allPropsals);
      if (allPropsals?.success) {
        toast.success("Proposal fetched");
        setListPropoasls(allPropsals.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to fetch proposals");
    }
  }

  useEffect(() => {
    getAllCustomerPropsals();
  }, []);

  return (
    <div>
      <p className="font-bold text-2xl text-center mb-5">All Propsals</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listPropoasls.map((item) => (
          <div
            key={item?._id}
            className="border rounded-lg p-4 shadow-md bg-white flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-lg mb-2 truncate">
                {item?.clientCompany}
              </h3>
              <p className=" text-gray-800 text-lg">
                <strong>Client:</strong> {item?.clientName}
              </p>
              <p className=" text-gray-800 text-lg">
                <strong>Client Address:</strong> {item?.clientAddress}
              </p>
              <p className=" text-gray-800 text-lg">
                <strong>Client GSTIN:</strong> {item?.GSTIN}
              </p>
            
              <p className=" text-gray-800 text-lg">
                <strong>Date:</strong>{" "}
                {new Date(item?.dateOfProposal).toLocaleDateString()}
              </p>
            </div>
            <p className="text-xl font-semibold mt-4 text-right text-blue-600">
              ₹{item?.totalAmount.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProposal;
