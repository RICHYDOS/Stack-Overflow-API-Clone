import express from "express";
import jwt from "jsonwebtoken";
import db from "../models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response } from "express";
import tryCatch from "../utils/tryCatch";
import { UserAttributes } from "../models/user";


dotenv.config();
const router = express.Router();

router.post("/register", tryCatch(async (req: Request, res: Response) => {
    const displayName: string = req.body.displayName;
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (!displayName || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    let user: UserAttributes;

    user = await db.User.findOne({ where: { email } });

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

router.post("/login", tryCatch(async (req: Request, res: Response) => {
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

router.put("/update/:id", tryCatch(async (req: Request, res: Response) => {

    let user: UserAttributes;

    user = await db.User.findOne({ where: { id: req.params.id } });

    if (user !== null) {
        const displayName: string = req.body.displayName || user.displayName;
        const email: string = req.body.email || user.email;
        const location: UserAttributes["location"] = req.body.location || user.location;
        const title: UserAttributes["title"] = req.body.title || user.title;
        const aboutMe: UserAttributes["aboutMe"] = req.body.aboutMe || user.aboutMe;


        user = await db.User.update({ displayName, email, location, title, aboutMe}, {
            where: {
              id: req.params.id
            }
        });
        return res.send("User Updated");
    }
    else {
        return res.send("User does not exist... Sign up Please");
    }
}));

router.delete("/delete/:id", tryCatch(async (req: Request, res: Response) => {

    let user: UserAttributes;
    user = await db.User.findOne({ where: { id: req.params.id } });
    if (user !== null) {

        await db.User.destroy({ where: { id: req.params.id } });
        return res.status(404).send("User deleted");
    }
    else {
        return res.send("User does not exist... Sign up Please");
    }
}));

export default router;