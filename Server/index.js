import express from 'express';
import dbConnect from "./Database/DbConnect.js"
import dotenv from "dotenv"
import userRoutes from './Routes/UserRoutes.js';
import partyRouter from './Routes/PartyRoutes.js';
const app = express();


dotenv.config();

app.use(express.json())
app.use("/auth",userRoutes);
app.use("/party",partyRouter);












app.listen(4500,()=>
{
    console.log("Server Running At port 4500");
    dbConnect();
});