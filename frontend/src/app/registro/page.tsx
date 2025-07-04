"use client";

import styles from '../../styles/registro.module.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { RegisterService } from "@/API/class/registro";
import { registerSchema, RegisterType } from '@/validations/registerSchema';

function Registro() {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const router = useRouter();
  const apiRef = useRef(new RegisterService());
  const [loading, setLoading] = useState(false);

  const onSubmit = form.handleSubmit(async (values: RegisterType) => {
    setLoading(true);
    try {
      const data = await apiRef.current.register({
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        email: values.email,
        password: values.password,
      });

      localStorage.setItem('token', data.access_token);

      Swal.fire({
        title: "Usuario registrado con éxito!",
        text: "Registro completado!",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'Ocurrió un error inesperado',
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className={styles.pageContainer}>
      <Card className={styles.cardHeader}>
        <CardHeader className={styles.registroTitulo}>
          <CardTitle className={styles.titulo}>Registro</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
              <FormField
                name="firstname"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className={styles.tituloLabel}>Nombre</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Ingresa tu nombre" disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="lastname"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className={styles.tituloLabel}>Apellido</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Ingresa tu apellido" disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className={styles.tituloLabel}>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Ingresa tu usuario" disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className={styles.tituloLabel}>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder='Debe contener "@" y ".com"' disabled={loading} />
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
                    <FormLabel className={styles.tituloLabel}>Crea una contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="Ingresa contraseña" disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className={styles.tituloLabel}>Repetir la contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="Ingresa contraseña" disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className={styles.botonEnviar} type="submit" disabled={loading}>
                {loading ? "Registrando..." : "Enviar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Registro;