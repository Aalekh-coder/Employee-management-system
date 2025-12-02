import { connectDB } from "@/lib/db";
import Proposal from "@/models/Proposal";
import Customer from "@/models/Customer";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const proposal = await Proposal.create(data);

    if (!proposal) {
      return Response.json({
        success: false,
        message: "Error while creating the proposals",
      });
    }

    // Find the customer by the clientId from the proposal
    const findCustomer = await Customer.findById(proposal.clientId);

    if (!findCustomer) {
      return Response.json({
        success: false,
        message: "Customer with the provided clientId not found",
      });
    }

    // Add the new proposal's ID to the customer's proposals array and save
    findCustomer.proposals.push(proposal._id);
    await findCustomer.save();

    return Response.json(
      {
        success: true,
        message: "Proposal created successfully",
        data: proposal,
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
