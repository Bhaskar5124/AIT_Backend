import { Resend } from 'resend'; // 1. Import Resend
import 'dotenv/config';
import Inquiry from '../models/InquirySchema.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function headKController(req, res) {
  const { 
  clientName,
  clientVision,
  headName
  } = req.body;

  try {
    // A. SAVE TO MONGODB
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();

    // B. SEND EMAIL (Using Resend API)
    const { data, error } = await resend.emails.send({
      // Until you verify a domain, you MUST use this 'from' address
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL, 
      subject: `AIT New Inquiry from: ${clientName}`,
      html: `
        <h3>New Inquiry Details</h3>
        <p><b>Name:</b> ${clientName}</p>
        <p><b>Vision:</b> ${clientVision}</p>
        <p><b>Submitted to:</b> ${headName}</p>
      `
    });

    if (error) {
      console.error("Resend Error:", error);
      // We still return success:true because the data WAS saved to MongoDB
      return res.status(200).json({ 
        success: true, 
        message: "Inquiry Data saved, but Email failed to send.",
        error: error.message 
      });
    }

    // C. SEND WHATSAPP (Optional - currently commented out in your code)
    // ... twilio logic here ...

    res.status(200).json({ success: true, message: "Inquiry Data saved and email sent via Resend!" });

  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}