import { Request, Response } from "express";
import { Comment } from "../controllers/answers";
import db from "../models";

// Get one Answer Comment
export const getOne = async (req: Request, res: Response) => {
    let comment: Comment;
    comment = await db.A_comments.findOne({ where: { id: req.params.id } });

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

// Edit an Answer comment
export const update = async (req: Request, res: Response) => {
    let comment: Comment;
    comment = await db.A_comments.findOne({ where: { id: req.params.id } });

    if (comment === null) {
        res.status(404);
        throw new Error("Comment does not exist");
    }
    // Check whether the comment was created by that user
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(403);
        throw new Error("Access Denied");
    }
    else {
        const title: string = req.body.title || comment.comment;
        comment = await db.A_comments.update({ comment: title }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send("Comment Updated");
    }
};

// Only a user can Delete his/her Comment
export const destroy = async (req: Request, res: Response) => {

    let comment: Comment;
    comment = await db.A_comments.findOne({ where: { id: req.params.id } });

    if (comment === null) {
        res.status(404);
        throw new Error("Comment does not exist");
    }
    else if (comment.UserId !== req.currentUser.user.id) {
        res.status(403);
        throw new Error("Access Denied");
    }
    else {
        await db.A_comments.destroy({ where: { id: req.params.id } });
        return res.status(200).send("Comment deleted");
    }
};