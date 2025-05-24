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
  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = form.handleSubmit((values: UserType) => {
    console.log(values);
    // enviar datos al servidor
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
                <Button asChild className={styles.botonEnviar} >
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
