import  { Crud }  from '../service';
import { User } from '../types/user';

export class Users extends Crud<User> {
    private endPoint: string;
    constructor(token?: string){
        super(token);
        this.endPoint = 'users';
    }

    async getAll(): Promise<User[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        return res.json();
    }

    async getOne(id: number): Promise<User> {
        const response = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
           method: 'GET',
           headers: this.getHeaders(),
        });
        return response.json();
    }

    async create(data: Partial<User>): Promise<User>{
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`,{
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    }

    async delete(id: number): Promise<void> {
        await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {method: 'DELETE', headers: this.getHeaders(),});
        
    }
}