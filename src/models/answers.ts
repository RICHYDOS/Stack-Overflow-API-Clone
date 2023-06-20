'use strict';
import { Model, Optional } from 'sequelize';

export interface AnswerAttributes {
	id: number;
	answer: string;
	votes: number;
}
export type AnswerInput = Optional<AnswerAttributes, 'id'>
export type AnswerOuput = Required<AnswerAttributes>

class Answer
	extends Model<AnswerAttributes, AnswerInput>
	implements AnswerAttributes
{
	id!: number;
	answer!: string;
	votes!: number;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default Answer;
