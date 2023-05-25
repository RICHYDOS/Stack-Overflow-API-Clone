'use strict';
import {Model} from 'sequelize';

export interface A_commentAttributes {
  id: number,
  comment: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class A_comments extends Model<A_commentAttributes> implements A_commentAttributes{
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
      A_comments.belongsTo(models.User);
      A_comments.belongsTo(models.Answer);
      // define association here
    }
  }
  A_comments.init({
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
    modelName: 'A_comments',
  });
  return A_comments;
};