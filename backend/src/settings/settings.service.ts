import { Injectable } from '@nestjs/common';
import ISettingsService from './settings.service.interface'
const myapp_config = require('../../private/app.config.json');

@Injectable()
export class SettingsService implements ISettingsService {
  getHostUrl = (): string => myapp_config.host.url;
  getFrontUrl = (): string => myapp_config.front_url;

  getUsersImagesPrefix = (): string => myapp_config.static_resources.users_images.prefix;
  getUsersImagesPath = (): string => myapp_config.static_resources.users_images.path;
  getBooksImagesPrefix = (): string => myapp_config.static_resources.books_images.prefix;
  getBooksImagesPath = (): string => myapp_config.static_resources.books_images.path;
  

  getDatabaseHost = ():string => myapp_config.database_connection.host;
  getDatabasePort = ():string => myapp_config.database_connection.port;
  getDatabaseUsername = ():string => myapp_config.database_connection.username;
  getDatabasePasswords = ():string => myapp_config.database_connection.password;
  getDatabaseName = ():string => myapp_config.database_connection.database;

  getLoggerConsoleDetailsLevel = ():string => myapp_config.logger.console_details_level;
  getLoggerFileDetailsLevel = ():string => myapp_config.logger.file_details_level;
  getLoggerLogFile = ():string => myapp_config.logger.log_file;
  getLoggerColorizeLog = ():string => myapp_config.logger.colorize_logs;
}
