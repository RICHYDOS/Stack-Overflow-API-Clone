import User from './users';
import Question from './questions';
import Answer from './answers';
import QuestionComment from './question_comments';
import AnswerComment from './answer_comments';
import { Sequelize, DataTypes, Dialect } from 'sequelize';
import { setting } from '../config/database';
const env = 'development';
const config = setting[env];
import { defineAssociations } from './associations';

const sequelizeConnection = new Sequelize(
	config.database as string,
	config.username,
	config.password,
	{ dialect: config.dialect as Dialect }
);

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		display_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.CHAR(60),
			allowNull: false
		},
		location: {
			type: DataTypes.STRING,
			allowNull: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		about_me: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		timestamps: true,
		sequelize: sequelizeConnection,
		modelName: 'User'
	}
);

Question.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		expectation: {
			type: DataTypes.STRING,
			allowNull: true
		},
		tags: {
			type: DataTypes.STRING,
			allowNull: true
		},
		votes: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		answer_count: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	},
	{
		timestamps: true,
		sequelize: sequelizeConnection,
		modelName: 'Question'
	}
);

Answer.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		answer: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 0
		},
		votes: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	},
	{
		timestamps: true,
		sequelize: sequelizeConnection,
		modelName: 'Answer'
	}
);

QuestionComment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		timestamps: true,
		sequelize: sequelizeConnection,
		modelName: 'Question_comments'
	}
);

AnswerComment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		timestamps: true,
		sequelize: sequelizeConnection,
		modelName: 'Answer_comments'
	}
);

defineAssociations();

export {
	User,
	Question,
	Answer,
	QuestionComment,
	AnswerComment,
	sequelizeConnection
};
