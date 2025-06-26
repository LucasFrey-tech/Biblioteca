import { Crud } from '../service';
import { Purchase, PurchaseItem } from '../types/purchase';

export class Purchases extends Crud<Purchase> {
    private endPoint: string;

    constructor(token?: string) {
        super(token);
        this.endPoint = 'purchases';
    }

    async getAll(): Promise<Purchase[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            throw new Error(`Error fetching purchases: ${res.statusText}`);
        }
        const data = await res.json();
        return data as Purchase[];
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
            const errorData = await res.json();
            throw new Error(`Error al procesar la compra: ${errorData.message || res.statusText}`);
        }
    }

    async getUserPurchaseHistory(idUser: number): Promise<Purchase[] | null> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${idUser}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`Error al obtener el historial de compras: ${res.statusText}`);
        }

        const text = await res.text();
        if (!text) return null;

        const data = JSON.parse(text);
        if (!data || !Array.isArray(data) || data.length === 0) return null;

        // Convertir purchaseDate a objeto Date
        return data.map((item: Purchase) => ({
            ...item,
            purchaseDate: new Date(item.purchaseDate),
        })) as Purchase[];
    }
}