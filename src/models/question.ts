'use strict';
import {Model} from 'sequelize';

interface QuestionAttributes {
  id: number,
  title: string,
  description: string,
  expectation?: string,
  tags?: string,
  votes: string,
  answers: string
}

module.exports = (sequelize: any, DataTypes:any) => {
  class Question extends Model<QuestionAttributes> 
  implements QuestionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    title!: string;
    description!: string;
    expectation?: string;
    tags?: string;
    votes!: string;
    answers!: string

    // Timestamps
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
      Question.belongsTo(models.User);
      Question.hasMany(models.Answer);
      Question.hasMany(models.Q_comments);
    }
  }
  Question.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expectation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    answers: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};