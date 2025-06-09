import { Crud } from '../service';
import { ShoppingCartBook } from '../types/shopping_cart';

export class ShoppingCart extends Crud<ShoppingCartBook> {
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

        const data = await res.json(); // tira errro si no hay datos cargados.
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

        return res.json(); //tira error siempre :v
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

    async removeItem(userId: number, bookId: number): Promise<boolean> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${userId}/${bookId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!res.ok) {
            if (res.status === 404) return false;
            const errorData = await res.json();
            throw new Error(`Error al eliminar ítem del carrito: ${errorData.message || res.statusText}`);
        }

        return true;
    }

    getAll(): Promise<ShoppingCartBook[]> {
        throw new Error('Method not implemented.');
    }
    getOne(id: number): Promise<ShoppingCartBook> {
        throw new Error('Method not implemented.');
    }
}