import { connectDB } from "@/lib/db";
import Proposal from "@/models/Proposal";

export async function POST(req) {
  try {
    // 1️⃣ Connect to DB
    await connectDB();

    // 2️⃣ Read JSON data
    const data = await req.json();


    const proposal = await Proposal.create(data);

    return Response.json(
      {
        success: true,
        message: "Proposal created successfully",
        data:proposal,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PROPOSAL API ERROR:", error);
    return Response.json(
      {
        success: false,
        message: "Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
