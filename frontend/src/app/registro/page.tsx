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
import { z } from "zod";
import { Button } from "@/components/ui/button";

const userSchema = z.object({
  name: z.string({
    required_error: "Nombre es requerido",
  }).min(3, "Tu nombre tiene que tener al menos 3 caracteres"),

  lastname: z.string({
    required_error: "Apellido es requerido",
  }).min(3, "Tu apellido tiene que tener al menos 3 caracteres"),

  username: z.string({
    required_error: "Nombre de usuario es requerido",
  }).min(3, "Tu nombre de usuario tiene que tener al menos 3 caracteres"),

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

  confirmPassword: z.string({
    required_error: "Confirma tu contraseña",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Tus contraseñas no coinciden",
  path: ["confirmPassword"], // Esto apunta el error al campo correspondiente
});

type UserType = z.infer<typeof userSchema>;

function Registro() {
  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = form.handleSubmit((values: UserType) => {
    console.log(values);
    // send data to the server
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
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className={styles.tituloLabel}>Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder='Ingresa tu nombre' />
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
                    <Input type="text" {...field} placeholder='Ingresa tu apellido' />
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
                    <Input type="text" {...field} placeholder='Ingresa tu usuario' />
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
                    <Input type="email" {...field} placeholder='Debe contener "@" y ".com" '/>
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
                    <Input type="password" {...field} placeholder ="Ingresa contraseña" />
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
                    <Input type="password" {...field} placeholder = "Ingresa contraseña"  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className={styles.botonEnviar}>Enviar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </div>
  );
}

export default Registro;
