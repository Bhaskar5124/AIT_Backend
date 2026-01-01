import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  clientFullName: String,
  clientEmail: String,
  clientPhone: String,
  clientSelectedRole: String,
  clientSelectedExperience: String,
  clientBudget: String,
  submittedAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', LeadSchema);

export default Lead;