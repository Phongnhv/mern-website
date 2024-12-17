import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from './routes/listing.route.js';
import adminRouter from './routes/admin.route.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
 
dotenv.config();
 
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
 
const app = express();
app.use(express.json());
 
app.use(cookieParser());
 
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", useRouter);
app.use("/api/auth", authRouter);
app.use('/api/listing', listingRouter);
app.use("/api/admin", adminRouter);


// Chỉ cho phép frontend của bạn
const corsOptions = {
  origin: 'https://mern-website-g35.web.app/', // Thay bằng URL của frontend
  methods: 'GET,POST,PUT,DELETE',       // Các method HTTP được phép
  credentials: true                     // Cho phép gửi cookie nếu cần
};

app.use(cors(corsOptions));

 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
