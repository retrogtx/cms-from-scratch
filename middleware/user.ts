import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function userMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.token;
    const decoded = jwt.verify(token as string, process.env.JWT_USER_PASSWORD as string);
    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
        (req as Request & { userId: string }).userId = decoded.id as string;
        next();
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}
