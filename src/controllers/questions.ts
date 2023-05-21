import { Request, Response } from "express";
import { QuestionAttributes } from "../models/question";
import { AnswerAttributes } from "../models/answer";
import db from "../models";

// Some of the methods or extra fields I used in the question routes
interface Question extends QuestionAttributes {
    UserId: number
};

interface Answer extends AnswerAttributes {
    UserId: number,
    QuestionId: number
}

// Create a question
export const create = async (req: Request, res: Response) => {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const expectation: string = req.body.expectation;
    const tags: string = req.body.tags;
    const UserId = req.currentUser.user.id;

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
};

// Get one question
export const getOne = async (req: Request, res: Response) => {
    let question: Question;
    question = await db.Question.findOne({ where: { id: req.params.id } });

    if (question === null) {
        res.status(400);
        throw new Error("Question does not exist");
    }
    else {
        console.log(question);
        return res.send(question);
    }
};

// Update a question
export const update = async (req: Request, res: Response) => {
    let question: Question;
    question = await db.Question.findOne({ where: { id: req.params.id } });

    if (question === null) {
        res.status(400);
        throw new Error("Question does not exist");
    }
    // Only a user that creates a question can edit it
    else if (question.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        const title: string = req.body.title || question.title;
        const description: string = req.body.description || question.description;
        const expectation: string = req.body.expectation || question.expectation;
        const tags: string = req.body.tags || question.tags;

        // Update the question and return some of the updated fields
        question = await db.Question.update({ title, description, expectation, tags }, {
            where: {
                id: req.params.id
            }, returning: ['title','description']
        });
        return res.send(question);
    }
};

// Delete a question
export const destroy = async (req: Request, res: Response) => {

    let question: Question;
    question = await db.Question.findOne({ where: { id: req.params.id } });

    if (question === null) {
        res.status(400);
        throw new Error("Question does not exist");
    }
    else if (question.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        await db.Question.destroy({ where: { id: req.params.id } });
        return res.status(200).send("Question deleted");
    }
};

// Create an Answer. An answer cannot exist without a question
export const createAnswer = async (req: Request, res: Response) => {
    let question: Question;
    question = await db.Question.findOne({ where: { id: req.params.id } });

    if (question === null) {
        res.status(400);
        throw new Error("Question does not exist");
    }
    else {
        const title: string = req.body.title;
        if (!title) {
            res.status(400);
            throw new Error("Title Field is Mandatory");
        }

        let answer: Answer;

        answer = await db.Answer.create({
            answer: title,
            UserId: req.currentUser.user.id,
            QuestionId: question.id
        });
        console.log(answer);

        if (answer) {
            // If an answer was created increase the answerCount in the question table by 1
            let answerCount: number;
            answerCount = question.answers + 1;
            question = await db.Question.update({ answers: answerCount }, {
                where: {
                    id: req.params.id
                }
            });
            return res.status(201).send(answer);
        }
        else {
            res.status(400);
            throw new Error("Invalid Data");
        }
    }
}

// Get all the answers related to a particular question
export const getAnswers = async (req: Request, res: Response) => {
    let answer: Answer[];
    answer = await db.Answer.findAll({ where: { QuestionId: req.params.id } });
    console.log(answer);

    // Since answer is an array of objects, I can use the ""length" method
    if (answer.length === 0) {
        res.status(400);
        throw new Error("No answers for this question");
    }
    else {
        return res.status(201).send(answer);
    }

}

// Upvote a question
export const upVote = async (req: Request, res: Response) => {
    let question: Question;
    question = await db.Question.findOne({ where: { id: req.params.id } });

    if (question === null) {
        res.status(400);
        throw new Error("Question does not exist");
    }
    else {
        const votes: number = question.votes + 1;
        question = await db.Question.update({ votes }, {
            where: {
                id: req.params.id
            }, returning: ['votes']
        });
        return res.send(`Vote Count: ${question}`);
    }
};

// Downvote a question
export const downVote = async (req: Request, res: Response) => {
    let question: Question;
    question = await db.Question.findOne({ where: { id: req.params.id } });

    if (question === null) {
        res.status(400);
        throw new Error("Question does not exist");
    }
    else {
        const votes: number = question.votes - 1;
        question = await db.Question.update({ votes }, {
            where: {
                id: req.params.id
            }, returning: ['votes']
        });
        return res.send(`Vote Count: ${question}`);
    }
};
