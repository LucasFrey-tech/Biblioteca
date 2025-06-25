import { RegisterRequestBody, AuthResponse } from "@/API/types/register";
import { Crud } from "../service";

export class RegisterService extends Crud<RegisterRequestBody> {

    getAll(): Promise<RegisterRequestBody[]> {
        throw new Error("Method not implemented.");
    }
    getOne(_id: number): Promise<RegisterRequestBody> {
        throw new Error("Method not implemented.");
    }
    create(_data: Partial<RegisterRequestBody>): Promise<RegisterRequestBody> {
        throw new Error("Method not implemented.");
    }
    update(_id: number, data: Partial<RegisterRequestBody>): Promise<RegisterRequestBody> {
        throw new Error("Method not implemented.");
    }
    delete(_id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    private endPoint: string;
    constructor(token?: string){
        super(token);
        this.endPoint = 'auth';
    }
  async register(data: RegisterRequestBody): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/${this.endPoint}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al registrar usuario");
    }

    return res.json();
  }
}
