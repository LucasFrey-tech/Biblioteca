import { Crud } from "../service";
import { BookLibreria } from "../types/libreria";

export class Libreria extends Crud<BookLibreria> {

    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'library_books';
    }

    async findAllByUser(userId: number): Promise<BookLibreria[]> {
        console.log("Buscando libros para el usuario222:2323323223", userId);
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${userId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        console.log("Respuesta de la API222:2223232323232", res);
        return res.json();
    }


    async create(data: Partial<BookLibreria>): Promise<BookLibreria> {
        try {
            if (data.idUser === undefined || data.idBook === undefined) {
                throw new Error('idUser and idBook are required');
            }

            const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    idUser: data.idUser,
                    idBook: data.idBook
                })
            });

            if (!res.ok) {
                
                let errorDetails = res.statusText;
                try {
                    const errorBody = await res.json();
                    if (errorBody.message) {
                        errorDetails = errorBody.message;
                    }
                } catch (e) {
                    console.error('Error parsing error response:', e);
                }
                throw new Error(`Error al agregar libro a la biblioteca (${res.status}): ${errorDetails}`);
            }

            return await res.json();
        } catch (error) {
            console.error('Error in Libreria.create:', error);
            throw error;
        }
    }

    getAll(): Promise<BookLibreria[]> {
        throw new Error("Method not implemented.");
    }
    getOne(_id: number): Promise<BookLibreria> {
        throw new Error("Method not implemented.");
    }
    update(_id: number, _data: Partial<BookLibreria>): Promise<BookLibreria> {
        throw new Error("Method not implemented.");
    }
    delete(_id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}