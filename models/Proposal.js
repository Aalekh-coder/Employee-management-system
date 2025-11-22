import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientCompany: { type: String, required: true },
    clientAddress: { type: String, required: true },
    dateOfProposal: { type: Date, default: Date.now },
    deliverables: [
      {
        title: { type: String, required: true },
        items: [{ type: String, required: true }],
      },
    ],
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
        duration: String,
        price: { type: Number, required: true, default: 0 },
      },
    ],

    discount: { type: Number, default: 0 },
    totalAmount: { type: Number },
    validTill: Date,
    paymentMethod: String,
  },
  { timestamps: true }
);

// Pre-save hook to calculate the totalAmount
ProposalSchema.pre("save", function (next) {
  // 'this' refers to the document being saved
  if (this.isModified("services") || this.isModified("discount")) {
    const subtotal = this.services.reduce(
      (acc, service) => acc + (service.price || 0),
      0
    );
    const discountAmount = this.discount || 0;
    const amountAfterDiscount = subtotal - discountAmount;
    const gstAmount = amountAfterDiscount * 0.18;
    this.totalAmount = amountAfterDiscount + gstAmount;
  }
  next();
});

export default mongoose.models.Proposal ||
  mongoose.model("Proposal", ProposalSchema);
