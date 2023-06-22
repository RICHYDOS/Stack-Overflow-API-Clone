'use strict';
import { Model, Optional } from 'sequelize';

export interface QuestionCommentAttributes {
	id: number;
	comment: string;
	UserId: number;
	QuestionId: number;
}
export type QuestionCommentInput = Optional<
	QuestionCommentAttributes,
	'id' | 'UserId' | 'QuestionId'
>;
export type QuestionCommentOuput = Required<QuestionCommentAttributes>;

class QuestionComment
	extends Model<QuestionCommentAttributes, QuestionCommentInput>
	implements QuestionCommentAttributes
{
	id!: number;
	comment!: string;
	UserId!: number;
	QuestionId!: number;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default QuestionComment;
