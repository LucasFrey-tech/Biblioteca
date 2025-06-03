// frontend/api/apiClient.ts
export const apiClient = async <T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    headers: Record<string, string> = {}
): Promise<T> => {
    const res = await fetch(`http://localhost:3001/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error en la petición');
    }

    return res.json();
};
