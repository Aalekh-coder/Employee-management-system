import mongoose from "mongoose";

const ServiceInvoiceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  HSN: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model.InvoiceService ||
  mongoose.model("InvoiceService", ServiceInvoiceSchema);
