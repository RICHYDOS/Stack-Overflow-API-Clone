import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err) {
		logger.error(err.message, { stackTrace: err.stack });
		res.send({ Title: 'Error', Message: err.message });
	}
};
export default errorHandler;
