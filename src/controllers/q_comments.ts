import { Request, Response } from "express";
import { Comment } from "../controllers/questions";
import db from "../models";

// Get one Question Comment
export const getOne = async (req: Request, res: Response) => {
    let comment: Comment;
    comment = await db.Q_comments.findOne({ where: { id: req.params.id } });

    if (comment === null) {
        res.status(400);
        throw new Error("Comment does not exist");
    }
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        console.log(comment);
        return res.send(comment);
    }
};

// Edit a question comment
export const update = async (req: Request, res: Response) => {
    let comment: Comment;
    comment = await db.Q_comments.findOne({ where: { id: req.params.id } });

    if (comment === null) {
        res.status(400);
        throw new Error("Comment does not exist");
    }
    // Check whether the comment was created by that user
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        const title: string = req.body.title || comment.comment;
        comment = await db.Q_comments.update({ comment: title }, {
            where: {
                id: req.params.id
            }
        });
        return res.send("Comment Updated");
    }
};

// Only a user can Delete his/her Comment
export const destroy = async (req: Request, res: Response) => {

    let comment: Comment;
    comment = await db.Q_comments.findOne({ where: { id: req.params.id } });

    if (comment === null) {
        res.status(400);
        throw new Error("Comment does not exist");
    }
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(400);
        throw new Error("Access Denied");
    }
    else {
        await db.Q_comments.destroy({ where: { id: req.params.id } });
        return res.status(200).send("Comment deleted");
    }
};