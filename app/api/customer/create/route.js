import { connectDB } from "@/lib/db";
import Customer from "@/models/Customer";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    const newCustomer = await Customer.create(data);

    return Response.json(
      {
        success: true,
        message: "customer create successfully",
        data: newCustomer,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Create customer api error", error);
    return Response.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
