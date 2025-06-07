import { Injectable } from '@nestjs/common';

const myapp_config = require('../private/app.config.json');

@Injectable()
export class SettingsService {
  getHostUrl(): string {
    return myapp_config.backend_url;
  }
  getBooksImagesPrefix(): string {
    return myapp_config.static_resources.books_images.prefix;
  }
  getBooksImagesPath(): string {
    return myapp_config.static_resources.books_images.path;
  }
}
