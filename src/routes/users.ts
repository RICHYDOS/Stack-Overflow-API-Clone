import express from "express";
import jwt from "jsonwebtoken";
import db from "../models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { UserAttributes } from "../models/user";

dotenv.config();
const router = express.Router();

router.post("/register", errorHandler(async (req: Request, res: Response) => {
    const displayName: string = req.body.displayName;
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (!displayName || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    let user: UserAttributes;

    user = await db.User.findOne({ where: { email } });
    console.log(user);

    if (user !== null) {
        return res.send("User already Exists... Login Please");
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await db.User.create({
            displayName,
            email,
            password: hashedPassword
        });
        console.log(user.id);
        
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

router.post("/login", errorHandler(async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    let user: UserAttributes;
    user = await db.User.findOne({ where: { email } });
    
    if (user !== null) {
        let hashedPassword: string = user.password;
    
        // Compare client password with db password
        if (user && (await bcrypt.compare(password, hashedPassword))) {
            const accessToken = jwt.sign(
                //Payload
                {
                    user: {
                        username: user.displayName,
                        email: user.email,
                        id: user.id
                    },
                },
                //Access Token Secret Key
                process.env.ACCESSTOKENSECRET as string,
                // Options like token expiry
                { expiresIn: "4h" }
            );
    
            return res.status(200).send({ access_token: accessToken });
        }
        return res.send("something went wrong");
        
    }

    else {
        res.status(401);
        throw new Error("Email or Password are invalid");
    }
}));

export default router;