import { Request, Router } from "express";
import { userModel, purchaseModel, courseModel } from "../db";
import { userMiddleware } from "../middleware/user";
import jwt from "jsonwebtoken";

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

userRouter.post("/signin",async function(req, res) {
    const { email, password } = req.body;

    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const user = await userModel.findOne({
        email: email,
        password: password
    }); //[]

    if (user) {
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_USER_PASSWORD as string);

        // Do cookie logic

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

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