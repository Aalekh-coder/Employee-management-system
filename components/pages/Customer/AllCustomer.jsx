"use client";

import CreateCustomer from "@/components/subComponents/customer/CreateCustomer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAllCustomerServices } from "@/service/customer";
import { Eye, FilePlusCorner, SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllCustomer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCustomer = async () => {
    try {
      setLoading(true);
      const response = await getAllCustomerServices();
      if (response.success) {
        toast.success("Customer list fetched");
        setCustomerList(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCustomer();
  }, []);

  return (
    <div>
      <p className="text-center font-bold text-2xl">All Customer</p>

      <Sheet>
        <SheetTrigger asChild>
          <div className="fixed bottom-5 right-5 h-20 w-20 bg-blue-300 flex items-center justify-center rounded-full">
            <FilePlusCorner size={30} />
          </div>
        </SheetTrigger>
        <SheetContent className={"p-5"}>
          <SheetHeader className={"sr-only"}>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <CreateCustomer />
        </SheetContent>
      </Sheet>

      {loading ? (
        <div>Loading..</div>
      ) : (
        <div className="mt-10">
          <div className="grid grid-cols-6 gap-3 bg-zinc-200 py-3 px-3 rounded font-semibold">
            <div>Company</div>
            <div>Name</div>
            <div>Phone</div>
            <div>GST</div>
            <div>City</div>
            <div>Actions</div>
          </div>
          {customerList.map((item, idx) => {
            return (
              <div
                key={item?._id}
                className={`bg-zinc-100 ${
                  idx && "bg-zinc-200"
                } grid grid-cols-6 gap-3 py-3 px-3 hover:bg-white duration-300`}
              >
                <div>{item?.company}</div>
                <div>{item?.name}</div>
                <div>{item?.phone}</div>
                <div>{item?.GSTIN}</div>
                <div>{item?.city}</div>
                <div className="flex items-center gap-8">
                  <div>
                    <Eye />
                  </div>
                  <div>
                    <SquarePen />
                  </div>
                  <div>
                    <Trash />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllCustomer;
