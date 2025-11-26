import React from "react";
import Proposal from "./Proposal";

const page = async ({ params }) => {
  const { create: customerId } = await params;
  return <Proposal customerId={customerId} />;
};

export default page;
