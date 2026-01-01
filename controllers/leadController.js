import nodemailer from 'nodemailer';
import 'dotenv/config';
import Lead from '../models/LeadSchema.js';

export async function leadController(req,res){

      const { 
        clientFullName, clientEmail, clientPhone, 
        clientSelectedRole, clientSelectedExperience, clientBudget 
      } = req.body;
    
      try {
        // A. SAVE TO MONGODB
        const newLead = new Lead(req.body);
        await newLead.save();
    
        // B. SEND EMAIL (Nodemailer)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Use App Password
          },
        });
    
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.RECEIVER_EMAIL, // Your email where you want to receive leads
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
        };
        await transporter.sendMail(mailOptions);
    
        // C. SEND WHATSAPP (Twilio)
        // const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        
        // await twilioClient.messages.create({
        //   from: 'whatsapp:+14155238886', // Twilio Sandbox Number
        //   to: `whatsapp:${process.env.MY_WHATSAPP_NUMBER}`, 
        //   body: `*New Lead Received!* \n\n👤 Name: ${clientFullName}\n💼 Role: ${clientSelectedRole}\n📧 Email: ${clientEmail}\n📞 Phone: ${clientPhone}\n💰 Budget: ${clientBudget}`
        // });
    
        res.status(200).json({ success: true, message: "Data saved and notifications sent!" });
    
      } catch (error) {
        console.error("Submission Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
}