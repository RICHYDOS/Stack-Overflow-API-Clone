import express from "express";
import dotenv from "dotenv";
import tryCatch from "../middleware/tryCatch";
import { Request, Response } from "express";
import { QuestionAttributes } from "../models/question";
import db from "../models";

import {auth} from "../middleware/auth";

dotenv.config();
const router = express.Router();

router.use(auth);

interface Question extends QuestionAttributes{
    UserId: number
};

router.post("/ask", tryCatch(async (req: Request, res: Response) => {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const expectation: string = req.body.expectation;
    const tags: string = req.body.tags;
    const UserId = req.currentUser.user.id

    if (!title || !description) {
        res.status(400);
        throw new Error("Title and Description Fields are Mandatory");
    }

    let question: Question;

    question = await db.Question.create({
        title,
        description,
        expectation,
        tags,
        UserId
    });
    
    console.log(question);
    
    if (question) {
        return res.status(201).send(question);
    }
    else {
        res.status(400);
        throw new Error("Invalid Data");
    }
}));

router.put("/edit/:id", tryCatch(async (req: Request, res: Response) => {
    let question: Question;
    question = await db.Question.findOne({ where: { id: req.params.id } });

    if(question === null){
        res.status(400);
        throw new Error("Question does not exist");
    }
    else if (question.UserId !== req.currentUser.user.id){
        res.status(400);
        throw new Error("Access Denied");
    }
    else{
        const title: string = req.body.title||question.title;
        const description: string = req.body.description||question.description;
        const expectation: string = req.body.expectation||question.expectation;
        const tags: string = req.body.tags||question.tags;
        question = await db.Question.update({ title, description, expectation, tags }, {
            where: {
                id: req.params.id
            }
        });
        return res.send("User Updated");
    }
}));

// router.delete("/delete/:id", tryCatch(destroy));


export default router;