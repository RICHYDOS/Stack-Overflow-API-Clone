'use strict';
import { Model, Optional } from 'sequelize';

interface UserAttributes {
	id: number;
	display_name: string;
	email: string;
	password: string;
	location?: string;
	title?: string;
	about_me?: string;
}
export type UserInput = Optional<UserAttributes, 'id'>
export type UserOuput = Required<UserAttributes>

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
	id!: number;
	display_name!: string;
	email!: string;
	password!: string;
	location?: string;
	title?: string;
	about_me?: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default User;
