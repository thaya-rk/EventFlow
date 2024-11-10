import express from "express";
import cors from "cors";
// import { User, Speaker, Event, Hall, Approval, Report } from "./db/index.js"; 
import userRoutes from './routes/user.route.js'

// Middleware to parse JSON request bodies
const app= express();
app.use(cors());
app.use(express.json()); 


app.get("/",(req,res)=>{
    res.send("Api is working")
});

// User Routes
app.use('/user', userRoutes);


export {app}