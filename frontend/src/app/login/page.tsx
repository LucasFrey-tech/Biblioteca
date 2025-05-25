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
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // ✅ Import correcto para App Router


// Validación
const userSchema = z.object({
  email: z.string({
    required_error: "Email es requerido",
  })
    .email("Formato de email invalido")
    .refine(val => val.includes("@") && val.includes(".com"), {
      message: "Tu email debe contener '@' y '.com'",
    }),
  password: z.string({
    required_error: "La contraseña es requerida",
  }).min(6, "Tu contraseña tiene que tener al menos 6 caracteres"),
});

type UserType = z.infer<typeof userSchema>;

export default function LogIn() {
  const router = useRouter();

  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = form.handleSubmit(async (values: UserType) => {
    console.log('Enviando solicitud con:', values);

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      console.log('Estado de la respuesta:', res.status, res.statusText);

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          alert('Error: Respuesta del servidor no es JSON válido');
          return;
        }
        alert('Error: ' + (errorData.message || 'Usuario o contraseña incorrectos'));
        return;
      }

      const data = await res.json();
      console.log('Datos:', data);

      if (data.access_token) {
        //Guardo el user en el local
        localStorage.setItem('token', data.access_token);
        router.push('/inicio'); 
      } else {
        alert('Login fallido: No se recibió el token');
        console.error('Error en la respuesta:', data);
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error de red:', error.message);
        alert('Error de conexión con el servidor: ' + error.message);
      } else {
        console.error('Error desconocido:', error);
        alert('Ocurrió un error inesperado.');
  }
    }
    console.log(localStorage);
  });

  return (
    <div className={styles.pageContainer}>
      <Card className={styles.cardHeader}>
        <CardHeader className={styles.registroTitulo}>
          <CardTitle className={styles.titulo}>Iniciar Sesión</CardTitle>
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
                  Enviar
                </Button>
                <Button asChild className={styles.botonEnviar}>
                  <Link href="/registro" className={styles.linkSinEstilo}>
                    Registrarse
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
