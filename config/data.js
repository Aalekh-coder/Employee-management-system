export const addProposalFormControl = [
  {
    label: "Client Name",
    name: "clientName",
    componentType: "input",
    type: "text",
    placeholder: "Enter product clientName",
  },
  {
    label: "Client Company",
    name: "clientCompany",
    componentType: "input",
    type: "text",
    placeholder: "Enter product clientCompany",
  },
  {
    label: "Client Address",
    name: "clientAddress",
    componentType: "input",
    type: "text",
    placeholder: "Enter product clientAddress",
  },
  {
    label: "GSTIN",
    name: "GSTIN",
    componentType: "input",
    type: "text",
    placeholder: "Enter product GSTIN",
  },
  {
    label: "Discount",
    name: "discount",
    componentType: "input",
    type: "number",
    placeholder: "Enter Discount",
  },
  {
    label: "Valid Till",
    name: "validTill",
    componentType: "input",
    type: "date",
  },
   {
    label: "Payment Method",
    name: "paymentMethod",
    componentType: "select",
    options: [
      { id: "upi", label: "UPI" },
      { id: "card", label: "Card" },
      { id: "cash", label: "Cash" },
      { id: "bank", label: "Bank" },
    ],
  },
];
