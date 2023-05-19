import { Request, Response } from "express";
import { AnswerAttributes } from "../models/answer";
import { QuestionAttributes } from "../models/question";
import db from "../models";

interface Answer extends AnswerAttributes {
    UserId: number,
    QuestionId: number,
    getQuestion(): QuestionAttributes,
    setQuestion(question: QuestionAttributes): void
}

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

export const update = async (req: Request, res: Response) => {
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
        const title: string = req.body.title || answer.answer;
        answer = await db.Answer.update({answer: title}, {
            where: {
                id: req.params.id
            }
        });
        return res.send("Answer Updated");
    }
};

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
        let question: any = await answer.getQuestion();
        await question.decrement('answers');
        
        await db.Answer.destroy({ where: { id: req.params.id } });
        return res.status(200).send("Answer deleted");
    }
};