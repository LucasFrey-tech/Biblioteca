import { Crud, PaginatedResponse } from '../service';
import { CarouselItemDTO } from '../types/carousel.dto';

export class CarouselAPI extends Crud<CarouselItemDTO> {
    getAllPaginated(page?: number, limit?: number): Promise<PaginatedResponse<CarouselItemDTO>> {
        throw new Error('Method not implemented.');
    }
    private endPoint: string;

    constructor(token?: string) {
        super(token);
        this.endPoint = 'news/carousel';
    }

    async getAll(): Promise<CarouselItemDTO[]> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            throw new Error(`Error getting carousel items: ${res.statusText}`);
        }

        const CarouselItems: CarouselItemDTO[] = await res.json();
        return CarouselItems;
    }

    async create(_data: Partial<CarouselItemDTO>): Promise<CarouselItemDTO> {
        const formData = new FormData();
        formData.append("idBook", _data.idBook + '');

        if (_data.image instanceof File) {
            formData.append("image", _data.image);
        }

        const res = await fetch(`${this.baseUrl}/${this.endPoint}`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`Error creating carousel item: ${res.statusText}`);
        }

        const CarouselItem = await res.json();
        return CarouselItem;
    }

    async update(_id: number, data: Partial<CarouselItemDTO>): Promise<CarouselItemDTO> {
        const formData = new FormData();
        formData.append("idBook", String(data.idBook));

        if (data.image instanceof File) {
            formData.append("image", data.image);
        }

        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${_id}`, {
            method: 'PUT',
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`Error updating carousel item: ${res.statusText}`);
        }

        const carouselItem: CarouselItemDTO = await res.json();
        return carouselItem;
    }


    async delete(_id: number): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${this.endPoint}/${_id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        if (!res.ok) {
            throw new Error(`Error updating carousel item: ${res.statusText}`);
        }
        return;
    }

    getOne(_id: number): Promise<CarouselItemDTO> {
        throw new Error('Method not implemented.');
    }

}