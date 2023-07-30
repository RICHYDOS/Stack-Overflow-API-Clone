import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { settings } from '../config/application';
import { logger } from '../utils/logger';

export interface UserPayload {
	userDetails: {
		display_name: string;
		email: string;
		id: number;
	};
	iat: number;
	exp: number;
}
export interface requestWithUserData extends Request {
	currentUser?: UserPayload;
}

export const auth = async (
	req: requestWithUserData,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const token: string | undefined = req.header('auth-token');
	if (!token) {
		res.status(401).send({
			Title: 'Error',
			Message: 'User is not Authorized or Token is missing'
		});
		throw new Error('User is not Authorized or Token is missing ');
	} else {
		try {
			const payload = jwt.verify(token, settings.secretKey) as UserPayload;
			req.currentUser = payload;
			next();
		} catch (error) {
			logger.error(error);
			res.status(401).send({
				Title: 'Error',
				Message: `${error}`
			});
			next(error);
		}
	}
};
