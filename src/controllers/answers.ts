import { Request, Response } from "express";
import { AnswerAttributes } from "../models/answer";
import { QuestionAttributes } from "../models/question";
import db from "../models";

// Extra methods that I used in the Answer Routes
interface Answer extends AnswerAttributes {
    UserId: number,
    QuestionId: number,
    getQuestion(): QuestionAttributes,
}

// Get one answer
export const getOne = async (req: Request, res: Response) => {
    let answer: Answer;
    answer = await db.Answer.findOne({ where: { id: req.params.id } });

    if (answer === null) {
        res.status(400);
        throw new Error("Answer does not exist");
    }
    else if (answer.UserId !== req.currentUser.user.id) {
        res.status(400);
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
        res.status(400);
        throw new Error("Answer does not exist");
    }
    // Check whether the answer was created by that user
    else if (answer.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        const title: string = req.body.title || answer.answer;
        answer = await db.Answer.update({ answer: title }, {
            where: {
                id: req.params.id
            }
        });
        return res.send("Answer Updated");
    }
};

// Delete an answer
export const destroy = async (req: Request, res: Response) => {

    let answer: Answer;
    answer = await db.Answer.findOne({ where: { id: req.params.id } });

    if (answer === null) {
        res.status(400);
        throw new Error("Answer does not exist");
    }
    else if (answer.UserId !== req.currentUser.user.id) {
        res.status(400);
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