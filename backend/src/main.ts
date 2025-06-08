import * as winston from 'winston';
import * as express from 'express';
import { existsSync, mkdirSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';

/**
 * Archivo principal que arranca la aplicación NestJS.
 * 
 * - Crea la instancia de la aplicación.
 * - Configura Winston como logger.
 * - Habilita CORS para el frontend.
 * - Inicia el servidor en el puerto 3001.
 */

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

const myapp_config = require('../private/app.config.json');

async function bootstrap() {
  
  // Setup users image directory
  if (!existsSync(myapp_config.static_resources.users_images.path)) {
    mkdirSync(myapp_config.static_resources.users_images.path);
  }
  // Setup books image directory
  if (!existsSync(myapp_config.static_resources.books_images.path)) {
    mkdirSync(myapp_config.static_resources.books_images.path);
  }
  
  const app = await NestFactory.create(AppModule,{
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({ all: myapp_config.logger.colorize_logs })
            ,winston.format.simple()
          )
          ,level: myapp_config.logger.console_details_level
        }),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple())
            ,filename: myapp_config.logger.log_file
            ,level: myapp_config.logger.file_details_level
          })
        ],
      })
    });
    
    app.use(myapp_config.static_resources.books_images.prefix, express.static(myapp_config.static_resources.books_images.path));
    
    app.enableCors({
      origin: myapp_config.front_url, 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
  });

  await app.listen(myapp_config.host.port);
}
bootstrap();
