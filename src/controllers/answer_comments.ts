import { Response } from 'express';
import { Comment } from './answers';
import { requestWithUserData } from '../middleware/auth';
import db from '../models';

export const getOne = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	}
	const comment: Comment = await db.Answer_comments.findOne({
		where: { id: req.params.id }
	});

	if (comment === null) {
		res.status(404);
		throw new Error('Comment does not exist');
	} else if (comment.UserId !== req.currentUser.user.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		console.log(comment);
		res.status(200).send(comment);
	}
};

export const update = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	}
	let comment: Comment;
	comment = await db.Answer_comments.findOne({ where: { id: req.params.id } });

	if (comment === null) {
		res.status(404);
		throw new Error('Comment does not exist');
	}
	// Check whether the comment was created by that user
	else if (comment.UserId !== req.currentUser.user.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const title: string = req.body.title || comment.comment;
		comment = await db.Answer_comments.update(
			{ comment: title },
			{
				where: {
					id: req.params.id
				}
			}
		);
		res.status(200).send('Comment Updated');
	}
};

// Only a user can Delete his/her Comment
export const destroy = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	}
	const comment: Comment = await db.Answer_comments.findOne({
		where: { id: req.params.id }
	});

	if (comment === null) {
		res.status(404);
		throw new Error('Comment does not exist');
	} else if (comment.UserId !== req.currentUser.user.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		await db.Answer_comments.destroy({ where: { id: req.params.id } });
		res.status(200).send('Comment deleted');
	}
};
