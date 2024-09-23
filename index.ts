import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { courseRouter } from "./routes/course";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

app.listen(3000, async () => {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Server is running on port 3000");
});
