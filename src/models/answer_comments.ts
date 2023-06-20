'use strict';
import { Model, Optional } from 'sequelize';

export interface AnswerCommentAttributes {
	id: number;
	comment: string;
}
export type AnswerCommentInput = Optional<AnswerCommentAttributes, 'id'>
export type AnswerCommentOuput = Required<AnswerCommentAttributes>

class AnswerComment
	extends Model<AnswerCommentAttributes, AnswerCommentInput>
	implements AnswerCommentAttributes
{
	id!: number;
	comment!: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default AnswerComment;
