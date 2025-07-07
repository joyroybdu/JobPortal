import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import mongoose from 'mongoose'; // ES Module
import userRoute from './routes/user.route.js';
import companyRoute from "./routes/company.route.js"
import jobRoutes from './routes/job.route.js';


dotenv.config({});
const app =express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with URL-encoded data (from forms) and makes it available in req.body

app.use(cookieParser()); // Parses cookies attached to the client request and makes them available in req.cookies

const corsOptions = {
    origin: ['http://localhost:5173'], // Allows only requests from this origin (e.g., your React frontend)
    credentials: true, // Allows sending cookies and authorization headers in cross-origin requests
};
app.use(cors(corsOptions)); // Enables CORS for the Express app
const port = process.env.PORT||3000;

//api
app.use("/api/v1/User",userRoute);
app.use("/api/v1/Company",companyRoute);
app.use('/api/v1/job', jobRoutes);
app.listen(port,()=>{
    connectDB();
    console.log(`server is running on port ${port}`)
})