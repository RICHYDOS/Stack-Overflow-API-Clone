// import { Request, Response } from 'express';
// import { AnswerAttributes } from '../models/answers';
// import { QuestionAttributes } from '../models/questions';
// import { Answer_commentAttributes } from '../models/answer_comments';
// import { requestWithUserData } from '../middleware/auth';
// import db from '../models';

// // Extra methods that I used in the Answer Routes
// interface Answer extends AnswerAttributes {
// 	UserId: number;
// 	QuestionId: number;
// 	getQuestion(): QuestionAttributes;
// }

// export interface Comment extends Answer_commentAttributes {
// 	UserId: number;
// 	AnswerId: number;
// }

// export const getOne = async (
// 	req: requestWithUserData,
// 	res: Response
// ): Promise<void> => {
// 	if (!req.currentUser) {
// 		res.status(403);
// 		throw new Error('Access Denied');
// 	}
// 	const answer: Answer = await db.Answer.findOne({
// 		where: { id: req.params.id }
// 	});

// 	if (answer === null) {
// 		res.status(404);
// 		throw new Error('Answer does not exist');
// 	} else if (answer.UserId !== req.currentUser.user.id) {
// 		res.status(403);
// 		throw new Error('Access Denied');
// 	} else {
// 		console.log(answer);
// 		res.send(answer);
// 	}
// };

// export const update = async (
// 	req: requestWithUserData,
// 	res: Response
// ): Promise<void> => {
// 	if (!req.currentUser) {
// 		res.status(403);
// 		throw new Error('Access Denied');
// 	}
// 	let answer: Answer;
// 	answer = await db.Answer.findOne({ where: { id: req.params.id } });

// 	if (answer === null) {
// 		res.status(404);
// 		throw new Error('Answer does not exist');
// 	}
// 	// Check whether the answer was created by that user
// 	else if (answer.UserId !== req.currentUser.user.id) {
// 		res.status(403);
// 		throw new Error('Access Denied');
// 	} else {
// 		const title: string = req.body.title || answer.answer;
// 		answer = await db.Answer.update(
// 			{ answer: title },
// 			{
// 				where: {
// 					id: req.params.id
// 				}
// 			}
// 		);
// 		res.status(200).send('Answer Updated');
// 	}
// };

// export const destroy = async (
// 	req: requestWithUserData,
// 	res: Response
// ): Promise<void> => {
// 	if (!req.currentUser) {
// 		res.status(403);
// 		throw new Error('Access Denied');
// 	}
// 	const answer: Answer = await db.Answer.findOne({
// 		where: { id: req.params.id }
// 	});

// 	if (answer === null) {
// 		res.status(404);
// 		throw new Error('Answer does not exist');
// 	} else if (answer.UserId !== req.currentUser.user.id) {
// 		res.status(403);
// 		throw new Error('Access Denied');
// 	} else {
// 		// Not sure what "type" should be here
// 		// Gets the question related to a particular answer and decreases the answer count in Questions whenever a user deletes an answer
// 		const question: any = await answer.getQuestion();
// 		await question.decrement('answer_count');

// 		await db.Answer.destroy({ where: { id: req.params.id } });
// 		res.status(200).send('Answer deleted');
// 	}
// };

// export const createComment = async (
// 	req: requestWithUserData,
// 	res: Response
// ): Promise<void> => {
// 	if (!req.currentUser) {
// 		res.status(403);
// 		throw new Error('Access Denied');
// 	}
// 	const answer: Answer = await db.Answer.findOne({
// 		where: { id: req.params.id }
// 	});

// 	if (answer === null) {
// 		res.status(404);
// 		throw new Error('Answer does not exist');
// 	}
// 	else {
// 		const title: string = req.body.title;
// 		if (!title) {
// 			res.status(400);
// 			throw new Error('Title Field is Mandatory');
// 		}

// 		const comment: Comment = await db.Answer_comments.create({
// 			comment: title,
// 			UserId: req.currentUser.user.id,
// 			AnswerId: answer.id
// 		});

// 		console.log(comment);

// 		if (comment) {
// 			res.status(200).send(comment);
// 		} else {
// 			res.status(400);
// 			throw new Error('Invalid Data');
// 		}
// 	}
// };

// // Get all the comments related to a particular answer
// export const getComments = async (
// 	req: Request,
// 	res: Response
// ): Promise<void> => {
// 	const comments: Comment[] = await db.Answer_comments.findAll({
// 		where: { AnswerId: req.params.id }
// 	});
// 	console.log(comments);

// 	if (comments.length === 0) {
// 		res.status(404);
// 		throw new Error('No Comments for this Answer');
// 	} else {
// 		res.status(200).send(comments);
// 	}
// };
