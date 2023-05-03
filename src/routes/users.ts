import express from "express";
import {Request, Response} from "express";
const router = express.Router();
import { errorHandler } from "../utils/errorHandler";
import db from "../models";
import {UserAttributes} from "../models/user";


router.post("/register", errorHandler(async (req: Request, res: Response) => {
    let user: UserAttributes;

    user = await db.User.findOne({ where: { email: 'richardosunmu@gmail.com' } });
    if (user !== null) {
        return res.send("User already Exists... Login Please");
    } 
    else {
        user = await db.User.create({
            displayName: "Richard",
            email: "richardosunmu@gmail.com",
            password: "recharge123@"
        });

        if (user) {
            const result = { user_id: user.id, user_email: user.email };
            return res.status(201).send(result);
        }
        else {
            res.status(400);
            throw new Error("Invalid Data");
        }
    }
}));

export default router;