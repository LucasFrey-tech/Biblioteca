import { Crud, PaginatedResponse } from '../service';
import { ShoppingCartBook } from '../types/shopping_cart';

export class ShoppingCart extends Crud<ShoppingCartBook> {
    getAllPaginated(page?: number, limit?: number): Promise<PaginatedResponse<ShoppingCartBook>> {
        throw new Error('Method not implemented.');
    }
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'shopping-cart';
    }

    async findByUser(idUser: number): Promise<ShoppingCartBook[] | null> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${idUser}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`Error al obtener el carrito: ${res.statusText}`);
        }

        const text = await res.text();
        if (!text) return null;

        const data = JSON.parse(text);
        if (!data || !Array.isArray(data) || data.length === 0) return null;

        return data as ShoppingCartBook[];
    }

    async create(data: Partial<ShoppingCartBook>): Promise<ShoppingCartBook> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error al crear ítem en el carrito: ${errorData.message || res.statusText}`);
        }

        return res.json();
    }

    async update(id: number, data: Partial<ShoppingCartBook>): Promise<ShoppingCartBook> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error al actualizar el ítem del carrito: ${errorData.message || res.statusText}`);
        }

        return res.json();
    }

    async delete(id: number): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error al eliminar ítem del carrito: ${errorData.message || res.statusText}`);
        }
    }

    getAll(): Promise<ShoppingCartBook[]> {
        throw new Error('Method not implemented.');
    }
    getOne(_id: number): Promise<ShoppingCartBook> {
        throw new Error('Method not implemented.');
    }

    async processPurchase(idUser: number): Promise<void> {
        const res = await fetch(`${this.baseUrl}/purchases/${idUser}`,{
            method: 'POST',
            headers: this.getHeaders(),
        });

        if(!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error al procesar la compra: ${errorData.message || res.statusText}`);
        }
    }
 
}