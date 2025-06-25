import ISettingsService from "../../../src/settings/settings.service.interface";

export const mockSettingsService: ISettingsService = {
    getHostUrl: jest.fn().mockResolvedValue("hostUrl"),
    getFrontUrl: jest.fn().mockResolvedValue("frontUrl"),
    getUsersImagesPrefix: jest.fn().mockResolvedValue("/users_images"),
    getUsersImagesPath: jest.fn().mockResolvedValue("D:/Projects/Code/test"),
    getBooksImagesPrefix: jest.fn().mockResolvedValue("/books_images"),
    getBooksImagesPath: jest.fn().mockResolvedValue("D:/Projects/Code/test"),
    getDatabaseHost: jest.fn().mockResolvedValue("localhost"),
    getDatabasePort: jest.fn().mockResolvedValue("1234"),
    getDatabaseUsername: jest.fn().mockResolvedValue("username"),
    getDatabasePasswords: jest.fn().mockResolvedValue("password"),
    getDatabaseName: jest.fn().mockResolvedValue("database"),
    getLoggerConsoleDetailsLevel: jest.fn().mockResolvedValue("debug"),
    getLoggerFileDetailsLevel: jest.fn().mockResolvedValue("info"),
    getLoggerLogFile: jest.fn().mockResolvedValue("logs/backend.log"),
    getLoggerColorizeLog: jest.fn().mockResolvedValue("true"),
}