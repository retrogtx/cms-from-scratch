import { Router, Request, Response } from "express";

const adminRouter = Router();

adminRouter.post("/signup", (req: Request, res: Response) => {
    res.json({
        message: "signup endpoint"
    });
});

adminRouter.post("/signin", (req: Request, res: Response) => {
    res.json({
        message: "signin endpoint"
    });
});

adminRouter.post("/course", (req: Request, res: Response) => {
    res.json({
        message: "create course endpoint"
    });
});

adminRouter.put("/course", (req: Request, res: Response) => {
    res.json({
        message: "update course endpoint"
    });
});

adminRouter.get("/course/bulk", (req: Request, res: Response) => {
    res.json({
        message: "get bulk courses endpoint"
    });
});

export { adminRouter };