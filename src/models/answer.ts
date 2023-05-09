'use strict';
import { Model} from 'sequelize';

export interface AnswerAttributes {
  id: number,
  answer: string,
  votes: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Answer extends Model<AnswerAttributes> implements AnswerAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    answer!: string;
    votes!: number;

    // Timestamps
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
      Answer.belongsTo(models.User);
      Answer.belongsTo(models.Question);
      Answer.hasMany(models.A_comments);
    }
  }
  Answer.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    },
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};