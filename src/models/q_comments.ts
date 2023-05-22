'use strict';
import {Model} from 'sequelize';

export interface Q_commentAttributes {
  id: number,
  comment: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Q_comments extends Model<Q_commentAttributes> implements Q_commentAttributes{
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
      Q_comments.belongsTo(models.User);
      Q_comments.belongsTo(models.Question);
    }
  }
  Q_comments.init({
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
    modelName: 'Q_comments',
  });
  return Q_comments;
};