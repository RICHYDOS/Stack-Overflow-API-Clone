'use strict';
import {Model} from 'sequelize';

export interface Answer_commentAttributes {
  id: number,
  comment: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Answer_comments extends Model<Answer_commentAttributes> implements Answer_commentAttributes{
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
      Answer_comments.belongsTo(models.User);
      Answer_comments.belongsTo(models.Answer);
      // define association here
    }
  }
  Answer_comments.init({
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
    modelName: 'Answer_comments',
  });
  return Answer_comments;
};