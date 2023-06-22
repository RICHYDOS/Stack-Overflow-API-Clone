import { Request, Response } from 'express';
import { requestWithUserData } from '../middleware/auth';
import { findAnswer, updateAnswer, deleteAnswer } from '../dal/answers';
import { createAnswerComment, findAnswerComments } from '../dal/comments';
import { logger } from '../utils/logger';

export const getOne = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	}
	const id = req.params.id;
	const answer = await findAnswer({ id });

	if (!answer) {
		res.status(404);
		throw new Error('Answer does not exist');
	} else if (answer.UserId !== req.currentUser.userDetails.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		res.status(200).send(answer);
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
	const id = req.params.id;
	const answer = await findAnswer({ id });

	if (answer === null) {
		res.status(404);
		throw new Error('Answer does not exist');
	}
	// Check whether the answer was created by that user
	else if (answer.UserId !== req.currentUser.userDetails.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const answer: string = req.body.title;
		const payload = { answer };
		await updateAnswer(payload, { id });
		logger.info('Answer Updated Successfully');
		res.status(200).send('Answer Updated');
	}
};

export const destroy = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	}
	const id = req.params.id;
	const answer = await findAnswer({ id });

	if (answer === null) {
		res.status(404);
		throw new Error('Answer does not exist');
	} else if (answer.UserId !== req.currentUser.userDetails.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		await deleteAnswer({ id }, answer);
		logger.info('Answer Updated Successfully');
		res.status(200).send('Answer deleted');
	}
};

export const createComment = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	}
	const id = req.params.id;
	const answer = await findAnswer({ id });

	if (answer === null) {
		res.status(404);
		throw new Error('Answer does not exist');
	} else {
		const comment: string = req.body.comment;
		if (!comment) {
			res.status(400);
			throw new Error('Title Field is Mandatory');
		}

		const payload = {
			comment,
			UserId: req.currentUser.userDetails.id,
			AnswerId: answer.id
		};
		const result = await createAnswerComment(payload);

		if (result) {
			res.status(200).send(result);
			logger.info('Comment Created Successfully');
		} else {
			res.status(400);
			throw new Error('Invalid Data');
		}
	}
};

// Get all the comments related to a particular answer
export const getComments = async (
	req: Request,
	res: Response
): Promise<void> => {
	const id = req.params.id;
	const comments = await findAnswerComments(id);

	if (comments.length === 0) {
		res.status(404);
		throw new Error('No Comments for this Answer');
	} else {
		res.status(200).send(comments);
	}
};
