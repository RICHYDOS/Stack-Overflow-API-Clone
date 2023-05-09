'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Q_comments extends sequelize_1.Model {
        static associate(models) {
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
//# sourceMappingURL=q_comments.js.map