import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", useRouter);
app.use("/api/user", authRouter);