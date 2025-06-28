import { Crud, PaginatedResponse } from '../service';
import { Purchase, PurchaseItem } from '../types/purchase';

export class Purchases extends Crud<Purchase> {
    private endPoint: string;

    constructor(token?: string) {
        super(token);
        this.endPoint = 'purchases';
    }

    async getAllPaginated(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Purchase>> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/paginated?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener compras paginadas (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        return {
            items: data.items.map((item: Purchase) => ({
                ...item,
                purchaseDate: new Date(item.purchaseDate),
            })),
            total: data.total
        };
    }

    async getAll(): Promise<Purchase[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Error al obtener compras (${res.status}): ${errorDetails}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error('Respuesta no es un arreglo de compras');
        }
        return data.map((item: Purchase) => ({
            ...item,
            purchaseDate: new Date(item.purchaseDate),
        }));
    }

    getOne(_id: number): Promise<Purchase> {
        throw new Error('Method not implemented.');
    }

    create(_data: Partial<Purchase>): Promise<Purchase> {
        throw new Error('Method not implemented.');
    }

    update(_id: number, _data: Partial<Purchase>): Promise<Purchase> {
        throw new Error('Method not implemented.');
    }

    delete(_id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async processPurchase(idUser: number, cartItems: PurchaseItem[]): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ idUser, items: cartItems })
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: res.statusText }));
            throw new Error(`Error al procesar la compra (${res.status}): ${errorData.message}`);
        }
    }

    async getUserPurchaseHistory(idUser: number): Promise<Purchase[] | null> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${idUser}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            const errorDetails = await res.text();
            throw new Error(`Error al obtener el historial de compras (${res.status}): ${errorDetails}`);
        }

        const text = await res.text();
        if (!text) return null;

        const data = JSON.parse(text);
        if (!data || !Array.isArray(data) || data.length === 0) return null;

        return data.map((item: Purchase) => ({
            ...item,
            purchaseDate: new Date(item.purchaseDate),
        }));
    }
}