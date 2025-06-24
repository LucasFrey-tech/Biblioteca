import { createLogger, format, transports, Logger } from 'winston';
import myapp_config from '../../private/app.config.json';

export class Log {
  private static instance: Logger;

  private static createBaseLogger(): Logger {
    return createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize({ all: myapp_config.logger.colorize_logs }),
            format.simple()
          ),
          level: myapp_config.logger.console_details_level
        }),
        new transports.File({
          format: format.combine(
            format.timestamp(),
            format.simple()
          ),
          filename: myapp_config.logger.log_file,
          level: myapp_config.logger.file_details_level
        }),
      ]
    });
  }

  public static getLogger(context?: string): Logger {
    if (!Log.instance) {
      Log.instance = Log.createBaseLogger();
    }
    return context ? Log.instance.child({ context }) : Log.instance;
  }
}