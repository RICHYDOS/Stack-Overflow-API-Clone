import { Request, Response } from "express";
import { Comment } from "./questions";
import db from "../models";

export const getOne = async (req: Request, res: Response) => {
    let comment: Comment;
    comment = await db.Q_comments.findOne({ where: { id: req.params.id } });

    if (comment === null) {
        res.status(404);
        throw new Error("Comment does not exist");
    }
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(403);
        throw new Error("Access Denied");
    }
    else {
        console.log(comment);
        return res.status(200).send(comment);
    }
};

export const update = async (req: Request, res: Response) => {
    let comment: Comment;
    comment = await db.Q_comments.findOne({ where: { id: req.params.id } });

    if (comment === null) {
        res.status(404);
        throw new Error("Comment does not exist");
    }
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(403);
        throw new Error("Access Denied");
    }
    else {
        const title: string = req.body.title || comment.comment;
        comment = await db.Q_comments.update({ comment: title }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send("Comment Updated");
    }
};

export const destroy = async (req: Request, res: Response) => {

    let comment: Comment;
    comment = await db.Q_comments.findOne({ where: { id: req.params.id } });

    if (comment === null) {
        res.status(404);
        throw new Error("Comment does not exist");
    }
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(403);
        throw new Error("Access Denied");
    }
    else {
        await db.Q_comments.destroy({ where: { id: req.params.id } });
        return res.status(200).send("Comment deleted");
    }
};