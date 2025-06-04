import { Crud } from "../service";
import { LoginRequestBody, AuthResponse } from "../types/auth";

export class Login extends Crud<LoginRequestBody>{
    private endPoint: string;
    constructor(token?: string){
        super(token);
        this.endPoint = 'auth';
    }

    async getAll(): Promise<never[]> {
        throw new Error('Method getAll not supported for Auth');
    }

    async getOne(id: number): Promise<never> {
        throw new Error('Method getOne not supported for Auth');
    }

    async create(data: Partial<LoginRequestBody>): Promise<LoginRequestBody> {
        throw new Error('Method create not supported for Auth');
    }

    async update(id: number, data: Partial<never>): Promise<never> {
        throw new Error('Method update not supported for Auth');
    }

    async delete(id: number): Promise<void> {
        throw new Error('Method delete not supported for Auth');
    }

    async login(credentials: LoginRequestBody): Promise<{ success: true, data: AuthResponse } | { success: false, error: string }> {
        try{
            console.log(`${this.baseUrl}/${this.endPoint}/login`);
            console.log("HOLA", credentials);
            const res = await fetch(`${this.baseUrl}/${this.endPoint}/login`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(credentials),
            });
            const body = await res.json();
    
            if (!res.ok) {
                return { success: false, error: body.message || "Error al iniciar sesión" };
            }
            return { success: true, data: body};
        }catch (error){
            return {
                success: false,
                error: error instanceof Error ? error.message : "Error desconocido"
            };
        }
    
    }
}