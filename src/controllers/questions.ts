import { Request, Response } from 'express';
import { requestWithUserData } from '../middleware/auth';
import {
	createQuestion,
	findQuestion,
	updateQuestion,
	deleteQuestion
} from '../dal/questions';
import { createsAnswer, findAnswers } from '../dal/answers';
import {
	createQuestionComment,
	findQuestionComment,
	findQuestionComments
} from '../dal/comments';
import { logger } from '../utils/logger';

export const create = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	}
	const title: string = req.body.title;
	const description: string = req.body.description;
	const expectation: string | undefined = req.body.expectation;
	const tags: string | undefined = req.body.tags;
	const UserId = req.currentUser.userDetails.id;

	if (!title || !description) {
		res.status(400);
		throw new Error('Title and Description Fields are Mandatory');
	}
	const result = { title, description, expectation, tags, UserId };
	const question = await createQuestion(result);
	if (question) {
		res.status(201).send(question);
		logger.info('Question Created Successfully');
	} else {
		res.status(400);
		throw new Error('Invalid Data');
	}
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const question = await findQuestion({ id });

	if (!question) {
		res.status(404);
		throw new Error('Question does not exist');
	} else {
		res.send(question);
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
	const question = await findQuestion({ id });

	if (!question) {
		res.status(404);
		throw new Error('Question does not exist');
	} else if (question.UserId !== req.currentUser.userDetails.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const title: string | undefined = req.body.title;
		const description: string | undefined = req.body.description;
		const expectation: string | undefined = req.body.expectation;
		const tags: string | undefined = req.body.tags;

		const result = { title, description, expectation, tags };
		const id = req.params.id;
		await updateQuestion(result, { id });
		logger.info('Question Updated Successfully');
		res.send('Status: Updated');
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
	const question = await findQuestion({ id });

	if (question === null) {
		res.status(404);
		throw new Error('Question does not exist');
	} else if (question.UserId !== req.currentUser.userDetails.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		await deleteQuestion({ id });
		logger.info('Question Deleted Successfully');
		res.send('Status: Deleted');
	}
};

// An answer cannot exist without a question
export const createAnswer = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	}
	const id = req.params.id;
	const question = await findQuestion({ id });

	if (!question) {
		res.status(404);
		throw new Error('No Question for this answer');
	} else {
		const title: string = req.body.title;
		if (!title) {
			res.status(400);
			throw new Error('Title Field is Mandatory');
		}
		const result = {
			answer: title,
			UserId: req.currentUser.userDetails.id,
			QuestionId: question.id
		};
		const answer = await createsAnswer(result);

		if (answer) {
			logger.info('Answer Created Successfully');
			res.status(201).send(answer);
		} else {
			res.status(400);
			throw new Error('Invalid Data');
		}
	}
};

// Get all the answers related to a particular question
export const getAnswers = async (
	req: Request,
	res: Response
): Promise<void> => {
	const QuestionId = req.params.id;

	const answer = await findAnswers(QuestionId);

	// answer is an array of objects
	if (answer.length === 0) {
		res.status(404);
		throw new Error('No answers for this question');
	} else {
		res.status(200).send(answer);
	}
};

export const upVote = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const question = await findQuestion({ id });

	if (!question) {
		res.status(404);
		throw new Error('Question does not exist');
	} else {
		const votes: number = question.votes + 1;
		await updateQuestion({ votes }, { id });
		logger.info('Question Updated Successfully');
		res.status(200).send('Status: Updated');
	}
};

export const downVote = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const question = await findQuestion({ id });

	if (!question) {
		res.status(404);
		throw new Error('Question does not exist');
	} else {
		const votes: number = question.votes - 1;
		await updateQuestion({ votes }, { id });
		logger.info('Question Updated Successfully');
		res.status(200).send('Status: Updated');
	}
};

// Comments have to be either under a question or an answer
export const createComment = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	}
	let id = req.params.id;
	const question = await findQuestion({ id });

	if (!question) {
		res.status(404);
		throw new Error('Question does not exist');
	} else {
		// A user can only have 1 comment per question
		id = question.UserId.toString();
		const comment = await findQuestionComment({ id });

		if (!comment) {
			const comment: string = req.body.comment;
			if (!comment) {
				res.status(400);
				throw new Error('Comment Field is Mandatory');
			}
			const payload = {
				comment,
				UserId: req.currentUser.userDetails.id,
				QuestionId: question.id
			};
			const result = await createQuestionComment(payload);

			if (comment) {
				logger.info('Comment Created Successfully');
				res.status(201).send(result);
			} else {
				res.status(400);
				throw new Error('Invalid Data');
			}
		} else {
			res.status(400);
			throw new Error('Can\'t Add another comment, only edit.');
		}
	}
};

// Get all the comments related to a particular question
export const getComments = async (
	req: Request,
	res: Response
): Promise<void> => {
	const id = req.params.id;
	const comments = await findQuestionComments(id);

	if (comments.length === 0) {
		res.status(404);
		throw new Error('No Comments for this question');
	} else {
		res.status(200).send(comments);
	}
};
