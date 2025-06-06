import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Archivo principal que arranca la aplicación NestJS.
 * 
 * - Crea la instancia de la aplicación.
 * - Configura Winston como logger.
 * - Habilita CORS para el frontend.
 * - Inicia el servidor en el puerto 3001.
 */

const logger_Config = require('../private/logger.config.json');

/**
 * Niveles disponibles de log en Winston:
 * 
 * - error: 0
 * - warn: 1
 * - info: 2
 * - http: 3
 * - verbose: 4
 * - debug: 5
 * - silly: 6
 */


/**
 * Función principal que inicia la aplicación NestJS.
 * 
 * Configura los transportes de Winston para la consola y archivo.
 * Habilita CORS para permitir el acceso desde el frontend en localhost:3000.
 * Inicia el servidor en el puerto 3001.
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

  const config = new DocumentBuilder()
    .setTitle('API Biblioteca ALEjandria')
    .setDescription('Esta API se encarga de manejar la informacion de la base de datos de ALEjandria.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
