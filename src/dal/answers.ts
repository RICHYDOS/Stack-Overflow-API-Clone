import { Answer, Question } from '../models';
import { AnswerInput } from '../models/answers';

export const createsAnswer = async (payload: AnswerInput): Promise<Answer> => {
	const answer: Answer = await Answer.create(payload);
	const question: Question = await answer.getQuestion();
	await question.increment('answer_count');
	return answer;
};

export const findAnswer = async (query: {
	id: string;
}): Promise<Answer | null> => {
	const answer: Answer | null = await Answer.findOne({
		where: query
	});
	return answer;
};

export const findAnswers = async (query: string): Promise<Answer[]> => {
	const answer: Answer[] = await Answer.findAll({
		where: { QuestionId: query }
	});
	return answer;
};

export const updateAnswer = async (
	payload: AnswerInput,
	query: { id: string }
): Promise<void> => {
	await Answer.update(payload, { where: query });
};

export const deleteAnswer = async (
	query: { id: string },
	answer: Answer
): Promise<void> => {
	const question: Question = await answer.getQuestion();
	await question.decrement('answer_count');
	await Answer.destroy({ where: query });
};
