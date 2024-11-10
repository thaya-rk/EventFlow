import { app } from "./app.js";
import dotenv from "dotenv";
import  cors from "cors";


dotenv.config({
    path: "./.env"
})

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)



const PORT = process.env.PORT || 8001

app.listen(PORT,()=>{
    console.log("Server is running...")
})