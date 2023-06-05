'use strict';
import { Model } from 'sequelize';

export interface Question_commentAttributes {
  id: number,
  comment: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Question_comments extends Model<Question_commentAttributes> implements Question_commentAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    comment!: string;

    // Timestamps
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
      Question_comments.belongsTo(models.User);
      Question_comments.belongsTo(models.Question);
    }
  }
  Question_comments.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Question_comments',
  });
  return Question_comments;
};