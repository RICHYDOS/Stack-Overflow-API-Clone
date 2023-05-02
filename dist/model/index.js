"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config2/database.config"));
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    display_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.CHAR(60),
        allowNull: false
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    about_me: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
}, { sequelize: database_config_1.default, tableName: "user" });
UserInstance.sync().then(() => {
    console.log("User table has been created successfuly");
});
//# sourceMappingURL=index.js.map