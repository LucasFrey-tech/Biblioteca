import * as express from 'express';
import { existsSync, mkdirSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Log } from './logger/logger';
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

async function bootstrap() {
  const logger = Log.getLogger();
  const myapp_config = require('../private/app.config.json');

  // Setup users image directory
  if (!existsSync(myapp_config.static_resources.users_images.path)) {
    mkdirSync(myapp_config.static_resources.users_images.path);
  }
  // Setup books image directory
  if (!existsSync(myapp_config.static_resources.books_images.path)) {
    mkdirSync(myapp_config.static_resources.books_images.path);
  }

  const rootLogger = logger;   
  const app = await NestFactory.create(AppModule, {logger: WinstonModule.createLogger({ instance: rootLogger})});


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,              // TRUE -> Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true,  // TRUE -> Lanza error si hay propiedades desconocidas
      transform: true,             // TRUE -> Transforma tipos (ej: convierte string a number)
    }),
  );

  app.use(myapp_config.static_resources.books_images.prefix, express.static(myapp_config.static_resources.books_images.path));

  const config = new DocumentBuilder()
    .setTitle('API Biblioteca ALEjandria')
    .setDescription('Esta API se encarga de manejar la informacion de la base de datos de ALEjandria.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.enableCors({
    origin: myapp_config.front_url,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(myapp_config.host.port);
  rootLogger.info('Servidor backend iniciado en http://localhost:3001', { context: 'Bootstrap' });
}
bootstrap();
