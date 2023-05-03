'use strict';
import { Model } from 'sequelize';

export interface UserAttributes {
  id: number,
  displayName: string,
  email: string,
  password: string,
  location?: string,
  title?: string,
  aboutMe?: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>
    implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    displayName!: string;
    email!: string;
    password!: string;
    location?: string;
    title?: string;
    aboutMe?: string;
    static associate(models: any) {
      // define association here
      User.hasMany(models.Question)
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    displayName: {
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
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aboutMe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};