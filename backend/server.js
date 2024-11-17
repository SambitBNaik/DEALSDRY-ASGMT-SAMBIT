import express from 'express';
import dotenv from 'dotenv';
import cookiParser from 'cookie-parser';

import createUser from "./routes/user.route.js";
import employeeRouter from "./routes/employee.route.js";

import {connectDB} from './lib/db.js'

dotenv.config();

const app = express();

app.use(express.json({limit:"10mb"}));
app.use(cookiParser());

app.use("/api/auth",createUser);
app.use("/api/employee",employeeRouter);

app.listen(process.env.PORT,()=>{ 
    console.log("Server is running on port 5000");
    connectDB();
});