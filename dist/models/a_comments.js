'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class A_comments extends sequelize_1.Model {
        static associate(models) {
            A_comments.belongsTo(models.User);
            A_comments.belongsTo(models.Answer);
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
//# sourceMappingURL=a_comments.js.map