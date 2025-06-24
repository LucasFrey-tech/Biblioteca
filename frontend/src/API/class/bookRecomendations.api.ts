import { Crud } from '../service';
import { BookRecommendationDTO } from '../types/bookRecomendation.dto';

export class BookRecomendationsAPI extends Crud<BookRecommendationDTO> {
    private endPoint: string;

    constructor(token?: string) {
        super(token);
        this.endPoint = 'news/recomendations';
    }

    async getAll(): Promise<BookRecommendationDTO[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            throw new Error(`Error getting carousel items: ${res.statusText}`);
        }

        const CarouselItems:BookRecommendationDTO[] = await res.json();
        return CarouselItems.sort();
    }

    async create(_data: Partial<BookRecommendationDTO>): Promise<BookRecommendationDTO> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            body: JSON.stringify({idBook:_data.idBook}),
        });
        if (!res.ok) {
            throw new Error(`Error creating carousel item: ${res.statusText}`);
        }

        const CarouselItem:BookRecommendationDTO = await res.json();
        return CarouselItem;
    }

    async update(_id: number, data: Partial<BookRecommendationDTO>): Promise<BookRecommendationDTO> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${_id}`,{
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({idBook:data.idBook}),
        });
        if (!res.ok) {
            throw new Error(`Error updating carousel item: ${res.statusText}`);
        }

        const carouselItem:BookRecommendationDTO = await res.json();
        return carouselItem;
    }

    async delete(_id: number): Promise<void> {
        const res = await  fetch(`${this.baseUrl}/${this.endPoint}/${_id}`, {
            method: 'DELETE', 
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            throw new Error(`Error updating carousel item: ${res.statusText}`);
        }
        return;
    }

    getOne(_id: number): Promise<BookRecommendationDTO> {
        throw new Error('Method not implemented.');
    }
}