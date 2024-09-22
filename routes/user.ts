import { Router } from "express";
import { userModel } from "../db";

export const userRouter = Router();

// add zod validation, hashing using bcrypt
userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        await userModel.create({
            email,
            password,
            firstName,
            lastName
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
        return;
    }

    res.json({
        message: "signup successful"
    });
});

userRouter.post("/signin", (req, res) => {
    res.json({
        message: "signin endpoint"
    });
});

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "purchases endpoint"
    });
});