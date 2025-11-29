import { connectDB } from "@/lib/db";
import InvoiceService from "@/models/invoice/InvoiceService";

export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const invoice = await InvoiceService.findById(id);

    if (!invoice) {
      return Response.json(
        {
          success: false,
          message: "invoice not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        data: invoice,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Get invoice service by id Error", error);
    return Response.json(
      { success: false, message: "Server error" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const invoice = await InvoiceService.findByIdAndDelete(id);

    if (!invoice) {
      return Response.json(
        {
          success: false,
          message: "invoice not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        data: invoice,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Delete invoice service by id Error", error);
    return Response.json(
      { success: false, message: "Server error" },
      {
        status: 500,
      }
    );
  }
}
