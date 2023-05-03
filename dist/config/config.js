"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setting = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.setting = {
    "development": {
        "username": process.env.MYSQL_USER,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
        "host": "127.0.0.1",
        "dialect": "mysql",
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
//# sourceMappingURL=config.js.map