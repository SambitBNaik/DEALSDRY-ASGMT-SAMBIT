import express from 'express';
import dotenv from 'dotenv';
import cookiParser from 'cookie-parser';
import path from 'path';

import createUser from "./routes/user.route.js";
import employeeRouter from "./routes/employee.route.js";

import {connectDB} from './lib/db.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname=path.resolve();


app.use(express.json({limit:"10mb"}));
app.use(cookiParser());

app.use("/api/auth",createUser);
app.use("/api/employee",employeeRouter);

if(process.env.NODE_ENV === "production"){
	app.use(express.static(path.join(__dirname,"/frontend/dist")));

	app.get("*", (req, res)=>{
		res.sendFile(path.resolve(__dirname ,"frontend","dist","index.html"));
	});
}

app.listen(PORT,()=>{ 
    console.log("Server is running on port 5000");
    connectDB();
});