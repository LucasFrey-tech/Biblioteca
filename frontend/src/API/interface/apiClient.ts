export interface APIClient<T> {
    getAll(): Promise<T[]>;
    getOne(id: number): Promise<T>;
    create(data: Partial<T>): Promise<T>;
    update(id: number, data: Partial<T>): Promise<T>;
    delete(id: number): Promise<void>;
}