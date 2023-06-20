import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserAttributes } from '../models/users';
import bcrypt from 'bcrypt';
import { settings } from '../config/application';
import { logger } from '../utils/logger';
import db from '../models';
import { requestWithUserData } from '../middleware/auth';

export const register = async (req: Request, res: Response): Promise<void> => {
	const display_name: string = req.body.displayName;
	const email: string = req.body.email;
	const password: string = req.body.password;

	if (!display_name || !email || !password) {
		res.status(400);
		throw new Error('All Fields are Mandatory');
	}

	let user: UserAttributes;

	user = await db.User.findOne({ where: { email } });

	if (user !== null) {
		res.status(400);
		throw new Error('User Already Exists. Login Instead');
	} else {
		const hashedPassword = await bcrypt.hash(password, 10);
		user = await db.User.create({
			display_name,
			email,
			password: hashedPassword
		});

		if (user) {
			const result = { user_id: user.id, user_email: user.email };
			logger.info('User Created Successfully');
			res.status(201).send(result);
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

	const user: UserAttributes = await db.User.findOne({ where: { email } });

	if (user !== null) {
		const hashedPassword: string = user.password;

		// Compare client password with db password
		if (user && (await bcrypt.compare(password, hashedPassword))) {
			const accessToken = jwt.sign(
				//Payload
				{
					user: {
						username: user.display_name,
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

export const getOne = async (req: requestWithUserData, res: Response) => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const user: UserAttributes = await db.User.findOne({
			where: { id: req.params.id },
			attributes: { exclude: ['password', 'updatedAt'] }
		});
		if (user !== null) {
			if (user.id === req.currentUser.user.id) {
				return res.send(user);
			} else {
				res.status(403);
				throw new Error('Access Denied');
			}
		} else {
			return res.send('User does not exist... Sign up Please');
		}
	}
};

export const update = async (req: requestWithUserData, res: Response) => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const user: UserAttributes = await db.User.findOne({
			where: { id: req.params.id }
		});

		if (user === null) {
			return res.send('User does not exist... Sign up Please');
		} else if (user.id !== req.currentUser.user.id) {
			res.status(403);
			throw new Error('Access Denied');
		} else {
			const displayName: string = req.body.displayName || user.display_name;
			const email: string = req.body.email || user.email;
			const location: UserAttributes['location'] =
				req.body.location || user.location;
			const title: UserAttributes['title'] = req.body.title || user.title;
			const aboutMe: UserAttributes['about_me'] =
				req.body.aboutMe || user.about_me;

			const result: [] = await db.User.update(
				{
					display_name: displayName,
					email,
					location,
					title,
					about_me: aboutMe
				},
				{
					where: { id: req.params.id },
					returning: true,
					attributes: [
						'id',
						'display_name',
						'email',
						'location',
						'title',
						'about_me'
					]
				}
			);
			console.log(result);

			return res.send('Status: Updated');
		}
	}
};

export const destroy = async (req: requestWithUserData, res: Response) => {
	if (!req.currentUser) {
		res.status(403);
		throw new Error('Access Denied');
	} else {
		const user: UserAttributes = await db.User.findOne({
			where: { id: req.params.id }
		});
		if (user === null) {
			return res.send('User does not exist... Sign up Please');
		}
		// A user cannot Delete another User's account
		else if (user.id !== req.currentUser.user.id) {
			res.status(403);
			throw new Error('Access Denied');
		} else {
			await db.User.destroy({ where: { id: req.params.id } });
			return res.status(200).send('User deleted');
		}
	}
};
