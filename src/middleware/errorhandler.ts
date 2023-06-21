import { Response } from 'express';
import { logger } from '../utils/logger';

const errorHandler = (err: Error, res: Response) => {
	if (err) {
		logger.error(err.message, { stackTrace: err.stack });
		res.send({ Title: 'Error', Message: err.message });
	}
};
export default errorHandler;
