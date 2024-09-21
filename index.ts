import express from "express";
import { userRouter } from "./routes/user";
import { courseRouter } from "./routes/course";

const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
