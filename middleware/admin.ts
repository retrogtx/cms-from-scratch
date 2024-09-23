import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD as string) as jwt.JwtPayload;

        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            (req as any).userId = decoded.id;
            next();
        } else {
            res.status(403).json({
                message: "Invalid token"
            });
        }
    } catch (error) {
        res.status(403).json({
            message: "You are not signed in"
        });
    }

}

module.exports = {
    adminMiddleware
}
