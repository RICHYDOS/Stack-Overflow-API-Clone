import { QuestionComment, AnswerComment } from '../models';
import { QuestionCommentInput } from '../models/question_comments';
import { AnswerCommentInput } from '../models/answer_comments';

export const createQuestionComment = async (
	payload: QuestionCommentInput
): Promise<QuestionComment> => {
	const comment: QuestionComment = await QuestionComment.create(payload);
	return comment;
};

export const findQuestionComment = async (
	query: { UserId: string } | { id: string }
): Promise<QuestionComment | null> => {
	const comment: QuestionComment | null = await QuestionComment.findOne({
		where: query
	});
	return comment;
};

export const findQuestionComments = async (
	query: string
): Promise<QuestionComment[]> => {
	const comments = await QuestionComment.findAll({
		where: { QuestionId: query }
	});
	return comments;
};

export const updateQuestionComment = async (
	payload: QuestionCommentInput,
	query: { id: string }
): Promise<void> => {
	await QuestionComment.update(payload, { where: query });
};

export const deleteQuestionComment = async (query: {
	id: string;
}): Promise<void> => {
	await QuestionComment.destroy({ where: query });
};

export const createAnswerComment = async (
	payload: AnswerCommentInput
): Promise<AnswerComment> => {
	const comment: AnswerComment = await AnswerComment.create(payload);
	return comment;
};

export const findAnswerComment = async (query: {
	id: string;
}): Promise<AnswerComment | null> => {
	const comment: AnswerComment | null = await AnswerComment.findOne({
		where: query
	});
	return comment;
};

export const findAnswerComments = async (
	query: string
): Promise<AnswerComment[]> => {
	const comments = await AnswerComment.findAll({
		where: { AnswerId: query }
	});
	return comments;
};

export const updateAnswerComment = async (
	payload: AnswerCommentInput,
	query: { id: string }
): Promise<void> => {
	await AnswerComment.update(payload, { where: query });
};

export const deleteAnswerComment = async (query: {
	id: string;
}): Promise<void> => {
	await AnswerComment.destroy({ where: query });
};
