'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            User.hasMany(models.Question);
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
//# sourceMappingURL=user.js.map