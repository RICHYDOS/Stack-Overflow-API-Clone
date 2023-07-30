'use strict';
import { Model, Optional } from 'sequelize';

export interface AnswerCommentAttributes {
	id: number;
	comment: string;
	UserId: number;
	AnswerId: number;
}
export type AnswerCommentInput = Optional<
	AnswerCommentAttributes,
	'id' | 'UserId' | 'AnswerId'
>;
export type AnswerCommentOuput = Required<AnswerCommentAttributes>;

class AnswerComment
	extends Model<AnswerCommentAttributes, AnswerCommentInput>
	implements AnswerCommentAttributes
{
	id!: number;
	comment!: string;
	UserId!: number;
	AnswerId!: number;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default AnswerComment;
