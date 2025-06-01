import { APIClient } from '../interface/apiClient';
import { User } from '../types/user';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class UsersStrategy implements APIClient<User> {
  async getAll(): Promise<User[]> {
    const res = await fetch(`${BASE_URL}/users`); // GET /users
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return res.json();
  }

  async getOne(id: number): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/${id}`); // GET /users/:id
    if (!res.ok) throw new Error("Error al obtener usuario");
    return res.json();
  }

  async create(data: Partial<User>): Promise<User> {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear usuario");
    return res.json();
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return res.json();
  }

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar usuario");
  }
}