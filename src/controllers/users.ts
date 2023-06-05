import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserAttributes } from "../models/users";
import bcrypt from "bcrypt";
import {settings} from "../config/app";
import db from "../models";

// Register a user
export const register = async (req: Request, res: Response) => {
    const displayName: string = req.body.displayName;
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (!displayName || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    let user: UserAttributes;

    // Check whether user is already in db
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

        if (user) {
            const result = { user_id: user.id, user_email: user.email };
            return res.status(201).send(result);
        }
        else {
            res.status(400);
            throw new Error("Invalid Data");
        }
    }
};

// Log a user in
export const login = async (req: Request, res: Response) => {
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
                        username: user.display_name,
                        email: user.email,
                        id: user.id
                    },
                },
                //Access Token Secret Key
                settings.secretKey,
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
};

// View User Profile
export const getOne = async (req: Request, res: Response) => {
    let user: UserAttributes;

    // Get all the user's details except for the "password" and "updatedAt" properties
    user = await db.User.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password', 'updatedAt'] } });
    if (user !== null) {
        if (user.id === req.currentUser.user.id){
            console.log(user);
            return res.send(user);
        }
        else{
            res.status(403);
            throw new Error("Access Denied");
        }
    }
    else {
        return res.send("User does not exist... Sign up Please");
    }
};

// Edit user profile
export const update = async (req: Request, res: Response) => {

    let user: UserAttributes;

    user = await db.User.findOne({ where: { id: req.params.id } });

    if (user === null) {
        return res.send("User does not exist... Sign up Please");
    }
    // A user cannot edit another User's details
    else if (user.id !== req.currentUser.user.id) {
        res.status(403);
        throw new Error("Access Denied");
    }
    else {
        const displayName: string = req.body.displayName || user.display_name;
        const email: string = req.body.email || user.email;
        const location: UserAttributes["location"] = req.body.location || user.location;
        const title: UserAttributes["title"] = req.body.title || user.title;
        const aboutMe: UserAttributes["about_me"] = req.body.aboutMe || user.about_me;

        // Update the necessary fields but leave out the password and updatedAt properties in the returned document
        user = await db.User.update({ displayName, email, location, title, aboutMe }, {
            where: { id: req.params.id },
            attributes: { exclude: ['password', 'updatedAt'] },
            returning: true
        });
        return res.send(`User: ${user}`);
    }
};

// Delete User Profile
export const destroy = async (req: Request, res: Response) => {

    let user: UserAttributes;
    user = await db.User.findOne({ where: { id: req.params.id } });
    if (user === null) {
        return res.send("User does not exist... Sign up Please");
    }
    // A user cannot Delete another User's account
    else if (user.id !== req.currentUser.user.id) {
        res.status(403);
        throw new Error("Access Denied");
    }
    else {
        await db.User.destroy({ where: { id: req.params.id } });
        return res.status(200).send("User deleted");
    }
};