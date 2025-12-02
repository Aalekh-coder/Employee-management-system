import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  serviceTitle: { type: String, required: true },
  amount: { type: Number, required: true },
  duration: { type: String, required: true },
  description: { type: String },
});

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
