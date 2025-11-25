import CreateInvoice from "@/components/pages/CreateInvoice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const page = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="Create-invoice">
        <TabsList>
          <TabsTrigger value="Create-invoice">Create</TabsTrigger>
          <TabsTrigger value="invoice">invoice</TabsTrigger>
        </TabsList>
        <TabsContent value="Create-invoice" className={"w-full"}>
          <CreateInvoice />
        </TabsContent>
        <TabsContent value="invoice">All invoices</TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
