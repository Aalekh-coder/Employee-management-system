import { connectDB } from "@/lib/db";
import Invoice from "@/models/invoice/Invoice";

export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    let invoiceFromDb = await Invoice.findById(id).populate({
      path: "services", // Corrected path to match the schema
      select: "serviceName HSN price",
    });
    if (!invoiceFromDb) {
      return Response.json(
        {
          message: "Invoice does not exits",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    // Transform the data to match the frontend's expectations, just like in the other API route
    const findInvoice = {
      ...invoiceFromDb.toObject(),
      services: invoiceFromDb.services.map((service) => ({
        id: service._id,
        description: service.serviceName,
        HSN: service.HSN,
        quantity: 1,
        rate: service.price,
        amount: service.price,
      })),
    };

    return Response.json({
      success: true,
      message: "Invoice details fetched successfully",
      data: findInvoice,
    });
  } catch (error) {
    console.log("Error while editing invoice", error);
    return Response.json(
      {
        success: false,
        message: "server error",
      },
      {
        status: 500,
      }
    );
  }
}
