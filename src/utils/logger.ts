import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
	transports: [
		new transports.File({
			dirname: 'src/logs',
			filename: 'error.log',
			level: 'error',
			format: format.combine(format.timestamp(), format.json({ space: 2 }))
		}),
		new transports.Console({
			level: 'info',
			format: format.combine(
				format.colorize(),
				format.timestamp(),
				format.printf((info) => {
					return `${info.level}: ${info.message}`;
				})
			)
		})
	]
});
