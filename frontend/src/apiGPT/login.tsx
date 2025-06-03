// frontend/pages/login.tsx
import { login } from '../apiGPT/auth';

const handleLogin = async (email: string, password: string) => {
  try {
    const result = await login({ email, password });
    console.log('Token:', result.token);
  } catch (err) {
    console.error('Error al iniciar sesión', err);
  }
};
