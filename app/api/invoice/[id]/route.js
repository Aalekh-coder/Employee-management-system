import { connectDB } from "@/lib/db";
import Invoice from "@/models/invoice/Invoice";

export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();

    let findInvoice = await Invoice.findById(id);
    if (!findInvoice) {
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

    Object.assign(findInvoice, body);

    const editedInvoice = await findInvoice.save();

    return Response.json({
      success: true,
      message: "Editing invoice details",
      data: editedInvoice,
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

export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    let findInvoice = await Invoice.findById(id);
    if (!findInvoice) {
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
