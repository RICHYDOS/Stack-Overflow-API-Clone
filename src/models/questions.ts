'use strict';
import { Model, Optional } from 'sequelize';

export interface QuestionAttributes {
	id: number;
	title: string;
	description: string;
	expectation?: string;
	tags?: string;
	votes: number;
	answer_count: number;
}
export type QuestionInput = Optional<QuestionAttributes, 'id'>
export type QuestionOuput = Required<QuestionAttributes>

class Question
	extends Model<QuestionAttributes, QuestionInput>
	implements QuestionAttributes
{
	id!: number;
	title!: string;
	description!: string;
	expectation?: string;
	tags?: string;
	votes!: number;
	answer_count!: number;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default Question;
