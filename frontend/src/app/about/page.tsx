'use client'

import Image from "next/image"
import styles from "../../styles/about.module.css";

export default function AboutPage() {
  return (
    <div className={styles.Contenido}>
        <main className={styles.Principal}>
          <div className={styles.Bienvenida}>
            <h3>Bienvenido a la Biblioteca Virtual</h3>
            <p>Explora nuestra coleccion de libros y sumergete en el mundo de la lectura</p>
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
          <div className={styles.BotonExplorar}>
            <button type="button">Explorar Biblioteca</button>
          </div>
          <section className={styles.SobreNosotros}>
            <h4>Sobre Nosotros:</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </section>
          <section className={styles.Contacto}>
            <h4>Contactanos!</h4>
            <div className={styles.Campos}>
              <input className={styles.Input} type="text" placeholder="Correo@dominio.com"/>
              <button className={styles.Enviar} type="button">Enviar</button>
            </div>
            <div className={styles.CampoConsulta}>
              <textarea className={styles.Consulta} name="Consulta" id="Consulta" rows={4} placeholder="Dejanos tu consulta aqui :D"></textarea>
            </div>
          </section>
        </main>

      <footer className={styles.Pie}>
        <div>
          <p>&copy; 2025 alejandría. Todos los derechos reservados.</p>
            <nav>
              <a href="/about">Sobre Nosotros</a>
              <a href="/contact">Contacto</a>
              <a href="/terms">Términos y Condiciones</a>
            </nav>
        </div>
      </footer>
    </div>
  );
}
