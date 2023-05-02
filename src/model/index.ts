import { Model, DataTypes } from "sequelize";
import sequeliize from "../config2/database.config";

interface UserAttributes {
    id: number,
    display_name: string,
    email: string,
    password: string,
    location?: string,
    title?: string,
    about_me?: string
}

export class UserInstance extends Model<UserAttributes> { }

UserInstance.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.CHAR(60),
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        about_me: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    },
    { sequelize: sequeliize, tableName: "user" }
);

UserInstance.sync().then(() => {
    console.log("User table has been created successfuly");
});