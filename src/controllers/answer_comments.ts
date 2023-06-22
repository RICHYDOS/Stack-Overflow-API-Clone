import { Response } from 'express';
import { requestWithUserData } from '../middleware/auth';
import {
	updateAnswerComment,
	findAnswerComment,
	deleteAnswerComment
} from '../dal/comments';
import { logger } from '../utils/logger';

export const getOne = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	}
	const id: string = req.params.id;
	const comment = await findAnswerComment({ id });

	if (comment === null) {
		res.status(404);
		throw new Error('Comment does not exist');
	} else if (comment.UserId !== req.currentUser.userDetails.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
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
	const id: string = req.params.id;
	const comment = await findAnswerComment({ id });

	if (comment === null) {
		res.status(404);
		throw new Error('Comment does not exist');
	}
	// Check whether the comment was created by that user
	else if (comment.UserId !== req.currentUser.userDetails.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const comment: string = req.body.comment;
		const payload = { comment };
		await updateAnswerComment(payload, { id });
		res.status(200).send('Comment Updated');
		logger.info('Comment Updated Successfully');
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
	const id: string = req.params.id;
	const comment = await findAnswerComment({ id });
	if (comment === null) {
		res.status(404);
		throw new Error('Comment does not exist');
	} else if (comment.UserId !== req.currentUser.userDetails.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		await deleteAnswerComment({ id });
		res.status(200).send('Comment deleted');
		logger.info('Comment Deleted Successfully');
	}
};
