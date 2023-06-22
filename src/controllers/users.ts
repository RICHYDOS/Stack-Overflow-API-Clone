import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { requestWithUserData } from '../middleware/auth';
import { settings } from '../config/application';
import { logger } from '../utils/logger';
import { User } from '../models';
import {
	createUser,
	findUser,
	userExists,
	updateUser,
	deleteUser
} from '../dal/users';

export const register = async (req: Request, res: Response): Promise<void> => {
	const display_name: string = req.body.display_name;
	const email: string = req.body.email;
	const password: string = req.body.password;

	if (!display_name || !email || !password) {
		res.status(400);
		throw new Error('All Fields are Mandatory');
	}
	if (await userExists(email)) {
		res.status(400);
		throw new Error('User Already Exists. Login Instead');
	} else {
		const hashedPassword = await bcrypt.hash(password, 10);
		const result = { display_name, email, password: hashedPassword };
		const user = await createUser(result);
		if (user) {
			logger.info('User Created Successfully');
			res.status(201).send(user);
		} else {
			res.status(400);
			throw new Error('Invalid Data');
		}
	}
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const email: string = req.body.email;
	const password: string = req.body.password;

	if (!email || !password) {
		res.status(400);
		throw new Error('All Fields are Mandatory');
	}
	// I need the password in the query result this time
	const user: User | null = await User.findOne({ where: { email } });

	if (user) {
		const hashedPassword: string = user.password;

		// Compare client password with db password
		if (await bcrypt.compare(password, hashedPassword)) {
			const accessToken = jwt.sign(
				//Payload
				{
					userDetails: {
						display_name: user.display_name,
						email: user.email,
						id: user.id
					}
				},
				//Access Token Secret Key
				settings.secretKey,
				// Options like token expiry
				{ expiresIn: '4h' }
			);
			logger.info('Login Successful');
			res.send({ Status: 'Logged in Successfully', Access_Token: accessToken });
		}
	} else {
		res.status(401);
		throw new Error('Email or Password are invalid');
	}
};

export const getOne = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const id = req.params.id;
		const user = await findUser({ id });
		if (user) {
			if (user.id === req.currentUser.userDetails.id) {
				res.send(user);
			} else {
				res.status(403).send('Access Denied');
				throw new Error('Access Denied');
			}
		} else {
			res.send('User does not exist... Sign up Please');
		}
	}
};

export const update = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const id = req.params.id;
		const user = await findUser({ id });

		if (!user) {
			res.send('User does not exist... Sign up Please');
		} else if (user.id !== req.currentUser.userDetails.id) {
			res.status(403);
			throw new Error('Access Denied');
		} else {
			const display_name: string | undefined = req.body.display_name;
			const email: string | undefined = req.body.email;
			const location: string | undefined = req.body.location;
			const title: string | undefined = req.body.title;
			const aboutMe: string | undefined = req.body.aboutMe;

			const result = {
				display_name,
				email,
				location,
				title,
				about_me: aboutMe
			};
			const id = req.params.id;
			try {
				await updateUser(result, { id });
			} catch (error) {
				res.status(500);
				throw new Error('Server Error');
			}
			logger.info('User Info Updated');
			res.send('Status: Updated');
		}
	}
};

export const destroy = async (
	req: requestWithUserData,
	res: Response
): Promise<void> => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const id = req.params.id;
		const user = await findUser({ id });
		if (!user) {
			res.send('User does not exist... Sign up Please');
		}
		// A user cannot Delete another User's account
		else if (user.id !== req.currentUser.userDetails.id) {
			res.status(403);
			throw new Error('Access Denied');
		} else {
			await deleteUser({ id });
			res.status(200).send('User deleted');
			logger.info('User Deleted Successfully');
		}
	}
};
