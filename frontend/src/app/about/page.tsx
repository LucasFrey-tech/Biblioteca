'use client'

import Image from "next/image"
import styles from "../../styles/about.module.css";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className={styles.Contenido}>
        <main className={styles.Principal}>
          <div className={styles.Bienvenida}>
            <h3>Bienvenido a la Biblioteca Virtual</h3>
            <p className={styles.subTitulo}> Explora nuestra coleccion de libros y sumergete en el mundo de la lectura</p>
          </div>
          <div className={styles.Posibilidades}>
            <section className={styles.Tarjeta}>
              <Image src="/logos/Explora.png" alt="Usuario" width={30} height={30} />
              <h5>Explora</h5>
              <p>Descubre nuestra amplia coleccion de libros</p>
            </section>
            <section className={styles.Tarjeta}>
              <Image src="/logos/Reserva.png" alt="Usuario" width={30} height={30} />
              <h5>Reserva</h5>
              <p>Reserva tus libros facilmente</p>
            </section>
            <section className={styles.Tarjeta}>
              <Image src="/logos/Lee.png" alt="Usuario" width={30} height={30} />
              <h5>Lee</h5>
              <p>Disfruta de la lectura en nuestro espacio</p>
            </section>
          </div>
          <div >
             <Link href="/catalogo">
              <Button className={styles.BotonExplorar} type="button">Explorar Biblioteca</Button>
             </Link>
 
          </div>
          <section className={styles.SobreNosotros}>
            <h4>Sobre Nosotros:</h4>
            <p>
              En nuestra librería, creemos en el poder de la lectura para transformar vidas. Por eso, ofrecemos una amplia selección de libros físicos y digitales para que cada lector pueda elegir la forma que más le guste de disfrutar una buena historia o aprender algo nuevo.
              Ya sea que prefieras el aroma de las páginas de un libro impreso o la practicidad de llevar tus lecturas en un dispositivo, acá vas a encontrar lo que buscás.
              Además, brindamos un servicio de librería accesible y flexible, aceptando múltiples formas de pago para que comprar sea fácil y seguro para todos.
              Nos apasiona conectar a las personas con los libros. Gracias por ser parte de esta comunidad lectora.
            </p>
          </section>
          <section className={styles.Contacto}>
            <h4 className={styles.tituloContacto}>Contactanos!</h4>
            <div className={styles.Campos}>
              <input className={styles.Input} type="text" placeholder="Correo@dominio.com"/>
              <button className={styles.Enviar} type="button">Enviar</button>
            </div>
            <div className={styles.CampoConsulta}>
              <textarea className={styles.Consulta} name="Consulta" id="Consulta" rows={4} placeholder="Dejanos tu consulta aqui :D"></textarea>
            </div>
          </section>
        </main>

    </div>
  );
}
