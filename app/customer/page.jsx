import AllCustomer from "@/components/pages/Customer/AllCustomer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const page = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="allCustomer">
        <TabsList>
          <TabsTrigger value="allCustomer">All Customer</TabsTrigger>
          <TabsTrigger value="invoice">invoice</TabsTrigger>
          <TabsTrigger value="proposal">Proposal</TabsTrigger>
          <TabsTrigger value="ledger">Ledger</TabsTrigger>
        </TabsList>
        <TabsContent value="allCustomer" className={"w-full"}>
          <AllCustomer /> 
        </TabsContent>
        <TabsContent value="invoice">All invoices</TabsContent>
        <TabsContent value="proposal">All Proposal</TabsContent>
        <TabsContent value="ledger">All ledger</TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
