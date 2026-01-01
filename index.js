import express from 'express';
import mongoose from 'mongoose';
// import twilio from 'twilio';
import cors from 'cors';
import 'dotenv/config';
import { leadRoutes } from './Routes/leadRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// -----------------------------------------------------------
// 1. MONGODB SETUP
// -----------------------------------------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));



// Port Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


//Routes Calling
leadRoutes(app);