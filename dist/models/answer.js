'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Answer extends sequelize_1.Model {
        static associate(models) {
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
//# sourceMappingURL=answer.js.map