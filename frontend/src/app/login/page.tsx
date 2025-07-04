"use client";

import styles from '../../styles/login.module.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { BaseApi } from '@/API/baseApi';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../context/UserContext';
import { loginSchema, UserType } from '@/validations/loginSchema';

export default function LogIn() {
  const router = useRouter();
  const api = new BaseApi();
  const form = useForm<UserType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const { refreshUser } = useUser();

  const onSubmit = form.handleSubmit(async (values: UserType) => {
    try {
      const res = await api.log.login(values);

      if (!res.success) {
        let errorData;
        try {
          errorData = res;
          console.error(errorData);
        } catch (e) {
          console.error(e);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La respuesta del servidor no es JSON válido',
          });
          return;
        }
        if (res.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Login fallido',
            text: 'Usuario bloqueado',
          });
          return;
        }

        Swal.fire({
          icon: 'error',
          title: 'Login fallido',
          text: 'Email o contraseña son incorrectos',
        });
        return;
      }

      const data = res;
      if (data.success) {
        localStorage.setItem('token', data.data.access_token);

        type JwtPayload = { sub: string; [key: string]: unknown };
        const decoded: JwtPayload = jwtDecode<JwtPayload>(data.data.access_token);
        localStorage.setItem('userId', decoded.sub);

        refreshUser();
        Swal.fire({
          title: 'Iniciando sesión!',
          text: 'Redirigiendo a la página de inicio...',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        setTimeout(() => {
          router.push('/inicio');
        }, 3000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Hubo un problema al procesar tu ingreso. Por favor, intentá nuevamente.',
        });
        console.error('Error en la respuesta:', data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error de red:', error.message);
        Swal.fire({
          title: 'Error en la red',
          text: 'Se perdió la conexión a la red',
          icon: 'question',
        });
      } else {
        console.error('Error desconocido:', error);
        Swal.fire({
          title: 'Error desconocido',
          text: 'Enviar mensaje al soporte para arreglar este problema',
          icon: 'question',
        });
      }
    }
  });

  return (
    <div className={styles.pageContainer}>
      <Card className={styles.cardHeader}>
        <CardHeader className={styles.registroTitulo}>
          <CardTitle className={styles.titulo}>Inicio de Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className={styles.tituloLabel}>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Ingresa tu email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className={styles.tituloLabel}>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="Ingresa tu contraseña" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={styles.botonContainer}>
                <Button className={styles.botonEnviar} type="submit">
                  Iniciar Sesión
                </Button>
                <div className={styles.divider}>
                  <p>¿No tienes cuenta?</p>
                </div>
                <Button asChild className={styles.botonEnviar}>
                  <Link href="/registro" className={styles.linkSinEstilo}>
                    Regístrate
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}