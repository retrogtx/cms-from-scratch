import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { courseRouter } from "./routes/course";

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

app.listen(3000, async () => {
    await mongoose.connect("mongodb+srv://iamamrit27:iamamrit@cluster0.z34oj.mongodb.net/");
    console.log("Server is running on port 3000");
});
