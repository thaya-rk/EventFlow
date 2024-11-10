import express from "express";
import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config({path: "./.env"})

// Server url setup
const PORT = process.env.PORT || 8001;
const HOST = process.env.HOST || 'localhost'; 
const fullURL = `http://${HOST}:${PORT}`;

app.use(express.json());


// Database Connection
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running at ${fullURL}`);
    })
})
.catch((err)=>{
    console.log("DB connection Error",err.message);
})