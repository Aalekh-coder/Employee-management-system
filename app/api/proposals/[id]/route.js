import { connectDB } from "@/lib/db";
import Proposal from "@/models/Proposal";

export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const proposal = await Proposal.findById(id);

    if (!proposal) {
      return Response.json(
        { success: false, message: "Proposal not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        data: proposal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("GET Proposal by ID Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const deleteProposal = await Proposal.findByIdAndDelete(id);

    if (!deleteProposal) {
      return Response.json(
        { success: false, message: "Proposal not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Proposal deleted successfully",
        data: deleteProposal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("DELETE Proposal Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const body = await req.json();

    const updatedProposal = await Proposal.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProposal) {
      return Response.json(
        { success: false, message: "Proposal not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Proposal updated successfully",
        data: updatedProposal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Edit by Id Api:", error);
    return Response.json(
      {
        success: false,
        message: "Server error while editing the Proposals",
      },
      { status: 500 }
    );
  }
}
