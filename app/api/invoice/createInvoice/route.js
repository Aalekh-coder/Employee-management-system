import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const invoice = await Invoice.create(data);
    return Response.json(
      {
        success: true,
        message: "Invoice created successfully!",
        data: invoice,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE INVOICE API ERROR:", error);
    return Response.join(
      {
        success: false,
        message: "Invoice error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
