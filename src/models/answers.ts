'use strict';
import { Model, Optional, BelongsToGetAssociationMixin } from 'sequelize';
import { Question } from './index';

export interface AnswerAttributes {
	id: number;
	answer: string;
	votes: number;
	UserId: number;
	QuestionId: number;
}
export type AnswerInput = Optional<
	AnswerAttributes,
	'id' | 'UserId' | 'QuestionId' | 'votes'
>;
export type AnswerOuput = Required<AnswerAttributes>;

class Answer
	extends Model<AnswerAttributes, AnswerInput>
	implements AnswerAttributes
{
	id!: number;
	answer!: string;
	votes!: number;
	UserId!: number;
	QuestionId!: number;
	// timestamps!
	public getQuestion!: BelongsToGetAssociationMixin<Question>;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default Answer;
