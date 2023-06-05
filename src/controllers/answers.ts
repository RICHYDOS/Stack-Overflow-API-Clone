import { Request, Response } from "express";
import { AnswerAttributes } from "../models/answer";
import { QuestionAttributes } from "../models/question";
import { A_commentAttributes } from "../models/a_comments";
import db from "../models";

// Extra methods that I used in the Answer Routes
interface Answer extends AnswerAttributes {
    UserId: number,
    QuestionId: number,
    getQuestion(): QuestionAttributes,
}

export interface Comment extends A_commentAttributes {
    UserId: number,
    AnswerId: number
}

// Get one answer
export const getOne = async (req: Request, res: Response) => {
    let answer: Answer;
    answer = await db.Answer.findOne({ where: { id: req.params.id } });

    if (answer === null) {
        res.status(404);
        throw new Error("Answer does not exist");
    }
    else if (answer.UserId !== req.currentUser.user.id) {
        res.status(403);
        throw new Error("Access Denied");
    }
    else {
        console.log(answer);
        return res.send(answer);
    }
};

// Edit an answer
export const update = async (req: Request, res: Response) => {
    let answer: Answer;
    answer = await db.Answer.findOne({ where: { id: req.params.id } });

    if (answer === null) {
        res.status(404);
        throw new Error("Answer does not exist");
    }
    // Check whether the answer was created by that user
    else if (answer.UserId !== req.currentUser.user.id) {
        res.status(403);
        throw new Error("Access Denied");
    }
    else {
        const title: string = req.body.title || answer.answer;
        answer = await db.Answer.update({ answer: title }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send("Answer Updated");
    }
};

// Delete an answer
export const destroy = async (req: Request, res: Response) => {

    let answer: Answer;
    answer = await db.Answer.findOne({ where: { id: req.params.id } });

    if (answer === null) {
        res.status(404);
        throw new Error("Answer does not exist");
    }
    else if (answer.UserId !== req.currentUser.user.id) {
        res.status(403);
        throw new Error("Access Denied");
    }
    else {
        // Not sure what "type" should be here
        // Gets the question related to a particular answer and decreases the answerCount in Questions whenever a user deletes an answer
        let question: any = await answer.getQuestion();
        await question.decrement('answers');

        await db.Answer.destroy({ where: { id: req.params.id } });
        return res.status(200).send("Answer deleted");
    }
};

export const createComment = async (req: Request, res: Response) => {
    let answer: Answer;
    answer = await db.Answer.findOne({ where: { id: req.params.id } });

    if (answer === null) {
        res.status(404);
        throw new Error("Answer does not exist");
    }
    else {
        let comment: Comment;
        const title: string = req.body.title;
        if (!title) {
            res.status(400);
            throw new Error("Title Field is Mandatory");
        }

        comment = await db.A_comments.create({
            comment: title,
            UserId: req.currentUser.user.id,
            AnswerId: answer.id
        });

        console.log(comment);

        if (comment) {
            return res.status(200).send(comment);
        }
        else {
            res.status(400);
            throw new Error("Invalid Data");
        }

    }
};

// Get all the comments related to a particular answer
export const getComments = async (req: Request, res: Response) => {
    let comments: Comment[];
    comments = await db.A_comments.findAll({ where: { AnswerId: req.params.id } });
    console.log(comments);

    if (comments.length === 0) {
        res.status(404);
        throw new Error("No Comments for this Answer");
    }
    else {
        return res.status(200).send(comments);
    }

}