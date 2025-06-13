export interface User {
    id: number;
    admin: boolean;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    tel?: number;
}