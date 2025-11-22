"use client";
import Form from "@/components/layout/Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addProposalFormControl } from "@/config/data";
import {
  initialDeliverablesFormData,
  initialPerposelFormData,
  initialservicesFormData,
} from "@/config/initialFormDate";
import { createProposelService } from "@/service";

import React, { useState } from "react";
import toast from "react-hot-toast";

const Proposal = () => {
  const [formData, setFormData] = useState(initialPerposelFormData);
  const [serviceList, setServiceList] = useState([]);
  const [serviceData, setServiceData] = useState(initialservicesFormData);
  const [deliverableList, setDeliverableList] = useState([]);
  const [deliverables, setDeliverables] = useState(initialDeliverablesFormData);

  function handleService(e) {
    e.preventDefault();
    setServiceList([...serviceList, serviceData]);

    setServiceData({
      serviceName: "",
      duration: "",
      price: "",
    });
  }

  function handleDeliverables(e) {
    e.preventDefault();
    setDeliverableList([...deliverableList, deliverables]);

    setDeliverables({
      title: "",
      items: "",
    });
  }

  const {
    clientName,
    clientCompany,
    clientAddress,
    GSTIN,
    discount,
    validTill,
    paymentMethod,
  } = formData;

  function handleRemoveService(indexToRemove) {
    setServiceList(serviceList.filter((_, index) => index !== indexToRemove));
  }

  function handleRemoveDeliverable(indexToRemove) {
    setDeliverableList(
      deliverableList.filter((_, index) => index !== indexToRemove)
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // --- Improved Validation ---
    if (
      !clientName ||
      !clientCompany ||
      !clientAddress ||
      !GSTIN ||
      !validTill ||
      !paymentMethod
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (GSTIN.length !== 15) {
      toast.error("GSTIN must be exactly 15 characters long.");
      return;
    }

    if(!serviceList.length){
      toast.error("Add Services ");
      return;
    }
    if(!deliverableList.length){
      toast.error("Add Diliverables");
      return;
    }

    const proposalFormData = {
      clientName,
      clientCompany,
      clientAddress,
      GSTIN,
      discount,
      validTill,
      paymentMethod,
      services: serviceList,
      deliverables: deliverableList,
    };

    try {
      const data = await createProposelService(proposalFormData);
      console.log("API Response:", data);

      if (data?.success) {
        setFormData(initialPerposelFormData);
        setServiceData(initialservicesFormData);
        setDeliverables(initialDeliverablesFormData);
        setServiceList([]);
        setDeliverableList([])
        toast.success("Proposal created successfully!");
      }
      // Optionally, you can reset the form here
    } catch (error) {
      console.error("CREATE PROPOSAL API ERROR:", error);
      toast.error(error.message || "Failed to create proposal.");
    }
  }

  return (
    <div className="px-32 py-10">
      <h1 className="font-bold text-3xl text-center my-5">Create Perposal</h1>
      <Form
        formData={formData}
        setFormData={setFormData}
        formControls={addProposalFormControl}
        buttonText={"Add"}
        onSubmit={handleSubmit}
      />

      <div className="mt-10 border-t pt-6">
        <form onSubmit={handleService} className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Add Services</h2>
          <div className="grid gap-2">
            <Label htmlFor="serviceTitle">Service Title</Label>
            <Input
              id="serviceTitle"
              required
              value={serviceData.serviceName}
              placeholder="Enter the title"
              onChange={(e) =>
                setServiceData({ ...serviceData, serviceName: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="serviceDesc">Duration of the Project</Label>
            <Input
              id="serviceDesc"
              required
              placeholder="Enter the project durations"
              value={serviceData.duration}
              onChange={(e) =>
                setServiceData({ ...serviceData, duration: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="servicePrice">Price</Label>
            <Input
              required
              id="servicePrice"
              placeholder="Enter the price"
              value={serviceData.price}
              onChange={(e) =>
                setServiceData({ ...serviceData, price: e.target.value })
              }
              type="number"
            />
          </div>
          <Button type="submit" className="w-fit">
            Add Service
          </Button>
        </form>
      </div>

      {/* Display Added Services List */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold">Added Services</h2>
        {serviceList.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {serviceList.map((service, index) => (
              <li
                key={index}
                className="border p-4 rounded-lg shadow-sm bg-slate-50 dark:bg-slate-800"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{service.serviceName}</h3>
                    <div className="mt-3">
                      <h4 className="font-semibold text-sm">
                        Duration: {service.duration}
                      </h4>
                    </div>
                    <p className="font-bold mt-3 text-md">
                      Price: ₹{service.price}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveService(index)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No services added yet.</p>
        )}
      </div>

      <div className="mt-10 border-t pt-6">
        <form onSubmit={handleDeliverables} className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Add Deliverable</h2>
          <div className="grid gap-2">
            <Label htmlFor="serviceTitle">Deliverables Title</Label>
            <Input
              id="serviceTitle"
              required
              value={deliverables.title}
              placeholder="Enter the title"
              onChange={(e) =>
                setDeliverables({ ...deliverables, title: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="serviceDesc">Add Deliverables items</Label>
            <Input
              id="serviceDesc"
              required
              placeholder="Enter the project durations with commas ','"
              value={deliverables.items}
              onChange={(e) =>
                setDeliverables({ ...deliverables, items: e.target.value })
              }
            />
          </div>
          <Button type="submit" className="w-fit">
            Add Deliverables
          </Button>
        </form>
      </div>

      {/* Display Added Deliverables List */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold">Added Deliverables</h2>
        {deliverableList.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {deliverableList.map((deliverable, index) => (
              <li
                key={index}
                className="border p-4 rounded-lg shadow-sm bg-slate-50 dark:bg-slate-800"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{deliverable.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {deliverable.items
                        .split(",")
                        .filter((item) => item.trim() !== "") // Filter out empty strings from split
                        .map((item, itemIndex) => (
                          <span
                            key={itemIndex}
                            className="inline-block bg-blue-100 text-blue-800 text-xl font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
                          >
                            {item.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                  {/* Optional: Add a remove button for deliverables here if needed */}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveDeliverable(index)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            No deliverables added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Proposal;
