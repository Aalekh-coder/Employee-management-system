import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientCompany: { type: String, required: true },
    clientAddress: { type: String, required: true },
    GSTIN: {
      type: String,
      required: true,
      minlength: 15,
      maxlength: 15,
      validate: {
        validator: (v) => /^[0-9A-Z]{15}$/.test(v),
        message: "Invalid GSTIN format",
      },
    },
    services: [
      {
        serviceName: { type: String, required: true },
        HSN: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    taxType: {
      type: String,
      enum: ["IGST", "SGST/CGST"],
      default: "SGST/CGST",
    },
    invoiceDate: {
      type: Date,
      default: Date.now,
    },
    totalAmount: {
      type: Number,
    },
    invoiceNo: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

InvoiceSchema.pre("save", async function (next) {
  // Calculate total amount with GST if services are modified or it's a new invoice
  if (this.isModified("services") || this.isNew) {
    const subtotal = this.services.reduce(
      (acc, service) => acc + service.price,
      0
    );
    this.totalAmount = subtotal * 1.18; // Add 18% GST
  }

  // Generate invoice number for new invoices
  if (this.isNew) {
    const lastInvoice = await this.constructor
      .findOne()
      .sort({ createdAt: -1 });
    let nextInvoiceNumber = 1;
    if (lastInvoice && lastInvoice.invoiceNo) {
      const lastNumber = parseInt(
        lastInvoice.invoiceNo.replace("PROMO", ""),
        10
      );
      nextInvoiceNumber = lastNumber + 1;
    }
    this.invoiceNo = `PROMO${String(nextInvoiceNumber).padStart(4, "0")}`;
  }

  next();
});

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);
