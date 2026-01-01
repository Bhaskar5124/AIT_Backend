import { Resend } from 'resend'; // 1. Import Resend
import 'dotenv/config';
import Lead from '../models/LeadSchema.js';

// 2. Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function leadController(req, res) {
  const { 
    clientFullName, clientEmail, clientPhone, 
    clientSelectedRole, clientSelectedExperience, clientBudget 
  } = req.body;

  try {
    // A. SAVE TO MONGODB
    const newLead = new Lead(req.body);
    await newLead.save();

    // B. SEND EMAIL (Using Resend API)
    const { data, error } = await resend.emails.send({
      // Until you verify a domain, you MUST use this 'from' address
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL, 
      subject: `AIT New Lead: ${clientFullName}`,
      html: `
        <h3>New Hire Requirement Details</h3>
        <p><b>Name:</b> ${clientFullName}</p>
        <p><b>Email:</b> ${clientEmail}</p>
        <p><b>Phone:</b> ${clientPhone}</p>
        <p><b>Role:</b> ${clientSelectedRole}</p>
        <p><b>Experience:</b> ${clientSelectedExperience}</p>
        <p><b>Budget:</b> ${clientBudget}</p>
      `
    });

    if (error) {
      console.error("Resend Error:", error);
      // We still return success:true because the data WAS saved to MongoDB
      return res.status(200).json({ 
        success: true, 
        message: "Data saved, but email failed to send.",
        error: error.message 
      });
    }

    // C. SEND WHATSAPP (Optional - currently commented out in your code)
    // ... twilio logic here ...

    res.status(200).json({ success: true, message: "Data saved and email sent via Resend!" });

  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}