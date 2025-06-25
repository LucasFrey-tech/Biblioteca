
export default interface ISettingsService{
    getHostUrl(): string
    getFrontUrl(): string

    getUsersImagesPrefix(): string
    getUsersImagesPath(): string
    getBooksImagesPrefix(): string
    getBooksImagesPath(): string
  

    getDatabaseHost():string
    getDatabasePort():string
    getDatabaseUsername():string
    getDatabasePasswords():string
    getDatabaseName():string

    getLoggerConsoleDetailsLevel():string
    getLoggerFileDetailsLevel():string
    getLoggerLogFile():string
    getLoggerColorizeLog():string
}