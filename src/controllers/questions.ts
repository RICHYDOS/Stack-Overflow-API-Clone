import { Request, Response } from 'express';
import { QuestionAttributes } from '../models/questions';
import { AnswerAttributes } from '../models/answers';
import { Question_commentAttributes } from '../models/question_comments';
import { requestWithUserData } from '../middleware/auth';
import db from '../models';

// Some of the methods or extra fields I used in the question routes
interface Question extends QuestionAttributes {
	UserId: number;
}

interface Answer extends AnswerAttributes {
	UserId: number;
	QuestionId: number;
}

export interface Comment extends Question_commentAttributes {
	UserId: number;
	QuestionId: number;
}

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
	const expectation: string = req.body.expectation;
	const tags: string = req.body.tags;
	const UserId = req.currentUser.user.id;

	if (!title || !description) {
		res.status(400);
		throw new Error('Title and Description Fields are Mandatory');
	}

	const question: Question = await db.Question.create({
		title,
		description,
		expectation,
		tags,
		UserId
	});

	console.log(question);

	if (question) {
		res.status(201).send(question);
	} else {
		res.status(400);
		throw new Error('Invalid Data');
	}
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
	const question: Question = await db.Question.findOne({
		where: { id: req.params.id }
	});

	if (question === null) {
		res.status(400);
		throw new Error('Question does not exist');
	} else {
		console.log(question);
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
	let question: Question;
	question = await db.Question.findOne({ where: { id: req.params.id } });

	if (question === null) {
		res.status(404);
		throw new Error('Question does not exist');
	} else if (question.UserId !== req.currentUser.user.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const title: string = req.body.title || question.title;
		const description: string = req.body.description || question.description;
		const expectation: string = req.body.expectation || question.expectation;
		const tags: string = req.body.tags || question.tags;

		// Update the question and return some of the updated fields
		question = await db.Question.update(
			{ title, description, expectation, tags },
			{
				where: {
					id: req.params.id
				},
				returning: ['title', 'description']
			}
		);
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

	const question: Question = await db.Question.findOne({
		where: { id: req.params.id }
	});

	if (question === null) {
		res.status(404);
		throw new Error('Question does not exist');
	} else if (question.UserId !== req.currentUser.user.id) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		await db.Question.destroy({ where: { id: req.params.id } });
		res.status(200).send('Question deleted');
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
	let question: Question;
	question = await db.Question.findOne({ where: { id: req.params.id } });

	if (question === null) {
		res.status(404);
		throw new Error('Question does not exist');
	} else {
		const title: string = req.body.title;
		if (!title) {
			res.status(400);
			throw new Error('Title Field is Mandatory');
		}

		const answer: Answer = await db.Answer.create({
			answer: title,
			UserId: req.currentUser.user.id,
			QuestionId: question.id
		});
		console.log(answer);

		if (answer) {
			// If an answer was created increase the answer count in the question table by 1
			const answerCount: number = question.answer_count + 1;
			question = await db.Question.update(
				{ answer_count: answerCount },
				{
					where: {
						id: req.params.id
					}
				}
			);
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
	const answer: Answer[] = await db.Answer.findAll({
		where: { QuestionId: req.params.id }
	});
	console.log(answer);

	// answer is an array of objects
	if (answer.length === 0) {
		res.status(404);
		throw new Error('No answers for this question');
	} else {
		res.status(200).send(answer);
	}
};

export const upVote = async (req: Request, res: Response): Promise<void> => {
	let question: Question;
	question = await db.Question.findOne({ where: { id: req.params.id } });

	if (question === null) {
		res.status(404);
		throw new Error('Question does not exist');
	} else {
		const votes: number = question.votes + 1;
		question = await db.Question.update(
			{ votes },
			{
				where: {
					id: req.params.id
				},
				returning: ['votes']
			}
		);
		res.status(200).send('Status: Updated');
	}
};

export const downVote = async (req: Request, res: Response): Promise<void> => {
	let question: Question;
	question = await db.Question.findOne({ where: { id: req.params.id } });

	if (question === null) {
		res.status(404);
		throw new Error('Question does not exist');
	} else {
		const votes: number = question.votes - 1;
		question = await db.Question.update(
			{ votes },
			{
				where: {
					id: req.params.id
				},
				returning: ['votes']
			}
		);
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
	const question: Question = await db.Question.findOne({
		where: { id: req.params.id }
	});

	if (question === null) {
		res.status(404);
		throw new Error('Question does not exist');
	} else {
		// A user can only have 1 comment per question
		let comment: Comment;
		comment = await db.Question_comments.findOne({
			where: { UserId: question.UserId }
		});

		if (comment === null) {
			const title: string = req.body.title;
			if (!title) {
				res.status(400);
				throw new Error('Title Field is Mandatory');
			}

			comment = await db.Question_comments.create({
				comment: title,
				UserId: req.currentUser.user.id,
				QuestionId: question.id
			});

			console.log(comment);

			if (comment) {
				res.status(201).send(comment);
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
	const comments: Comment[] = await db.Question_comments.findAll({
		where: { QuestionId: req.params.id }
	});
	console.log(comments);

	if (comments.length === 0) {
		res.status(404);
		throw new Error('No Comments for this question');
	} else {
		res.status(200).send(comments);
	}
};
