import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const logger_Config = require('../private/logger.config.json');

/* Los niveles de log de Winston son:
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({ all: logger_Config.colorize_logs })
            ,winston.format.simple()
          )
          ,level: logger_Config.console_details_level
        }),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple())
          ,filename: logger_Config.log_file
          ,level: logger_Config.file_details_level
        })
      ],
    })
  });

  // Habilitar CORS permitiendo solo el origen de tu frontend
  app.enableCors({
    origin: 'http://localhost:3000', // URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
