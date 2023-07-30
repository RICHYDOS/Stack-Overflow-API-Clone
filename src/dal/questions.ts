import { Question } from '../models';
import { QuestionInput, OptionalQuestionInput } from '../models/questions';

export const createQuestion = async (
	payload: QuestionInput
): Promise<Question> => {
	const question: Question = await Question.create(payload);
	return question;
};

export const findQuestion = async (query: {
	id: string;
}): Promise<Question | null> => {
	const question: Question | null = await Question.findOne({
		where: query
	});
	return question;
};

export const updateQuestion = async (
	payload: OptionalQuestionInput,
	query: { id: string }
): Promise<void> => {
	await Question.update(payload, { where: query });
};

export const deleteQuestion = async (query: { id: string }): Promise<void> => {
	await Question.destroy({ where: query });
};
