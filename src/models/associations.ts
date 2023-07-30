import User from './users';
import Question from './questions';
import Answer from './answers';
import QuestionComment from './question_comments';
import AnswerComment from './answer_comments';

export function defineAssociations(): void {
	Question.belongsTo(User);
	User.hasMany(Question);

	Answer.belongsTo(User);
	User.hasMany(Answer);

	Answer.belongsTo(Question);
	Question.hasMany(Answer);

	QuestionComment.belongsTo(User);
	User.hasMany(QuestionComment);

	QuestionComment.belongsTo(Question);
	Question.hasMany(QuestionComment);

	AnswerComment.belongsTo(User);
	User.hasMany(AnswerComment);

	AnswerComment.belongsTo(Answer);
	Answer.hasMany(AnswerComment);
}
