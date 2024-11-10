import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config();
const dbURI = process.env.MONGODB_URI;

// MongoDB connection setup
const connectDB = async () => {
    try {
      const dbName = process.env.DB_NAME;
      const dbURI = process.env.MONGODB_URI;
  
      if (!dbName) {
        console.error("DB_NAME is not defined in the environment variables.");
        process.exit(1);
      }
  
      await mongoose.connect(`${dbURI}/${dbName}`);
      
      console.log(`MongoDB connected Successfully DB Host: ${mongoose.connection.host}`);
    } catch (error) {
      console.error("Error connecting to DB", error.message);
      process.exit(1);
    }
  };
  
// Exporting models
import User from '../models/user.model.js';
import Speaker from '../models/speaker.model.js';
import Event from '../models/event.model.js';
import Hall from '../models/hall.model.js';
import Approval from '../models/approval.model.js';
import Report from '../models/report.model.js';

export { connectDB, User, Speaker, Event, Hall, Approval, Report };
