import { Request, Router } from "express";
import { userModel, purchaseModel, courseModel } from "../db";
import { userMiddleware } from "../middleware/user";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";

export const userRouter = Router();

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.json({
            message: "signup successful"
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Invalid input", errors: error.errors });
        } else {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Error creating user" });
        }
    }
});

userRouter.post("/signin", async function(req, res) {
    const signinSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });

    try {
        const { email, password } = signinSchema.parse(req.body);

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password as string);

        if (!isPasswordValid) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_USER_PASSWORD as string);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({
            message: "Signin successful",
            token: token
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Invalid input", errors: error.errors });
        } else {
            console.error("Error during signin:", error);
            res.status(500).json({ message: "Error during signin" });
        }
    }
});

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId =  (req as { userId?: string }).userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})