import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: true,
    },
    clientName: { type: String, required: true },
    clientCompany: { type: String, required: true },
    clientAddress: { type: String, required: true },
    dateOfProposal: { type: Date, default: Date.now },
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
    tanNo: {
      type: String,
    },

    services: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Service",
      },
    ],

    discount: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    totalAmount: { type: Number },
    validTill: Date,
    paymentMethod: String,
  },
  { timestamps: true }
);

// Pre-save hook to calculate the totalAmount
ProposalSchema.pre("save", async function (next) {
  if (
    this.isModified("services") ||
    this.isModified("discount") ||
    this.isModified("discountPercentage") ||
    this.isModified("tanNo")
  ) {
    try {
      await this.populate("services");

      const subtotal = this.services.reduce(
        (acc, service) => acc + (service.price || 0),
        0
      );

      let discountAmount = 0;
      if (this.discountPercentage > 0) {
        discountAmount = subtotal * (this.discountPercentage / 100);
      } else {
        discountAmount = this.discount || 0;
      }

      let amountAfterDiscount = subtotal - discountAmount;
      let tanCharge = this.tanNo ? amountAfterDiscount * 0.02 : 0;
      let gstAmount = (amountAfterDiscount + tanCharge) * 0.18;
      this.totalAmount = amountAfterDiscount + tanCharge + gstAmount;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export default mongoose.models.Proposal ||
  mongoose.model("Proposal", ProposalSchema);
