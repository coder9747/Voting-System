import express from 'express';
import dbConnect from "./Database/DbConnect.js"
import dotenv from "dotenv"
import userRoutes from './Routes/UserRoutes.js';
const app = express();


dotenv.config();

app.use(express.json())
app.use("/auth",userRoutes);












app.listen(4500,()=>
{
    console.log("Server Running At port 4500");
    dbConnect();
});