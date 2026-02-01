import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  clientName: String,
  clientVision: String,
  headName: String,
  submittedAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

export default Inquiry;