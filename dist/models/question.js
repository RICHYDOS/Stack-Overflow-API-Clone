'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Question extends sequelize_1.Model {
        static associate(models) {
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
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        sequelize,
        modelName: 'Question',
    });
    return Question;
};
//# sourceMappingURL=question.js.map