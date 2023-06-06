import dotenv from "dotenv";
dotenv.config();

const username_development = process.env.MYSQL_USER as string;
const password_development = process.env.MYSQL_PASSWORD as string;
const database_development = process.env.MYSQL_DATABASE;
const host_development = process.env.MYSQL_HOST;

const username_production = process.env.MYSQL_USER_PRODUCTION as string;
const password_production = process.env.MYSQL_PASSWORD_PROSUCTION as string;
const database_production = process.env.MYSQL_DATABASE_PRODUCTION;
const host_production = process.env.MYSQL_HOST_PRODUCTION;

export const setting = {
  "development": {
    "username": username_development,
    "password": password_development,
    "database": database_development,
    "host": host_development,
    "dialect": "mysql",
  },
  "test": {
    "username": username_development,
    "password": password_development,
    "database": database_development,
    "host": host_development,
    "dialect": "mysql"
  },
  "production": {
    "username": username_production,
    "password": password_production,
    "database": database_production,
    "host": host_production,
    "dialect": "mysql"
  }
}
