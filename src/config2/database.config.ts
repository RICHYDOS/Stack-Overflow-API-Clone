import dotenv from "dotenv";
import {Sequelize} from "sequelize";
dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE as string, process.env.MYSQL_USER as string, process.env.MYSQL_PASSWORD as string, { dialect: "mysql" });

export default sequelize;