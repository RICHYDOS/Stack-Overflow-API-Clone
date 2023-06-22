'use strict';
import { Model, Optional, HasManyGetAssociationsMixin } from 'sequelize';
import { Answer } from './index';

export interface QuestionAttributes {
	id: number;
	title: string;
	description: string;
	expectation?: string;
	tags?: string;
	votes: number;
	answer_count: number;
	UserId: number;
}
export type QuestionInput = Optional<
	QuestionAttributes,
	'id' | 'votes' | 'answer_count' | 'UserId'
>;
export type QuestionOuput = Required<QuestionAttributes>;
export interface OptionalQuestionInput
	extends Omit<QuestionInput, 'title' | 'description'> {
	title?: string;
	description?: string;
}

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
	UserId!: number;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getAnswers!: HasManyGetAssociationsMixin<Answer>;
}

export default Question;
