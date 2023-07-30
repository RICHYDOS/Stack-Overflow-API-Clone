import { Request, Response, NextFunction } from 'express';
import { requestWithUserData } from './auth';

export const tryCatch =
	(
		controller: (
			req: requestWithUserData | Request,
			res: Response
		) => Promise<void>
	) =>
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				await controller(req, res);
			} catch (error) {
				return next(error);
			}
		};
