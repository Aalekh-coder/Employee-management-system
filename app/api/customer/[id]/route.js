import { connectDB } from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;


    const customer = await Customer.findById(id);

    if (!customer) {
      return Response.json(
        {
          success: false,
          message: "Customer not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        data: customer,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Get customer by id Error", error);
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

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return Response.json(
        {
          success: false,
          message: "Customer not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        message: `${customer?.name} customer deleted successfull`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Delete by id api:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// export async function PUT(req, context) {
//   try {
//     await connectDB();

//     const { id } = await context.params;

//     const {
//       name,
//       company,
//       GSTIN,
//       phone,
//       website,
//       Address,
//       city,
//       state,
//       pincode,
//       country,
//       meetingDate,
//     } = req.json();

//     let findCustomer = await Customer.findById(id);
//     if (!findCustomer) {
//       return Response.json(
//         {
//           message: "customer does not exists",
//           success: false,
//         },
//         { status: 404 }
//       );
//     }

//     findCustomer.name = name || findCustomer.name;
//     findCustomer.company = company || findCustomer.company;
//     findCustomer.GSTIN = GSTIN || findCustomer.GSTIN;
//     findCustomer.phone = phone || findCustomer.phone;
//     findCustomer.website = website || findCustomer.website;
//     findCustomer.Address = Address || findCustomer.Address;
//     findCustomer.city = city || findCustomer.city;
//     findCustomer.state = state || findCustomer.state;
//     findCustomer.pincode = pincode || findCustomer.pincode;
//     findCustomer.country = country || findCustomer.country;
//     findCustomer.meetingDate = meetingDate || findCustomer.meetingDate;

//     const editedCustomer = await findCustomer.save();

//     return Response.json({
//       success: true,
//       message: "customer edit successfully",
//       data: editedCustomer,
//     });
//   } catch (error) {
//     console.log("Edit by id api:", error);
//     return Response.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }


export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // No 'await' needed

    const {
      name,
      company,
      GSTIN,
      phone,
      website,
      Address,
      city,
      state,
      pincode,
      country,
      meetingDate,
    } = await req.json(); // 'await' added here

    let findCustomer = await Customer.findById(id);
    if (!findCustomer) {
      return Response.json(
        {
          message: "customer does not exist",
          success: false,
        },
        { status: 404 }
      );
    }

    // Use ?? if you want to avoid empty string/false assignments
    findCustomer.name = name ?? findCustomer.name;
    findCustomer.company = company ?? findCustomer.company;
    findCustomer.GSTIN = GSTIN ?? findCustomer.GSTIN;
    findCustomer.phone = phone ?? findCustomer.phone;
    findCustomer.website = website ?? findCustomer.website;
    findCustomer.Address = Address ?? findCustomer.Address; // Fixed here
    findCustomer.city = city ?? findCustomer.city;
    findCustomer.state = state ?? findCustomer.state;
    findCustomer.pincode = pincode ?? findCustomer.pincode;
    findCustomer.country = country ?? findCustomer.country;
    findCustomer.meetingDate = meetingDate ?? findCustomer.meetingDate;

    const editedCustomer = await findCustomer.save();

    return Response.json({
      success: true,
      message: "customer edit successfully",
      data: editedCustomer,
    });
  } catch (error) {
    console.log("Edit by id api:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

