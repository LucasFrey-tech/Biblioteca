import Link from "next/link";
import styles from '../../styles/footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.title}>Sobre Nosotros</h3>
          <p className={styles.text}>
            Somos una empresa innovadora comprometida con ofrecer soluciones de calidad que transforman ideas en realidades.
          </p>
          <Link href="/about" className={styles.ctaButton}>
            Conoce Más
          </Link>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Enlaces Rápidos</h3>
          <ul className={styles.links}>
            <li><Link href="/" className={styles.link}>Inicio</Link></li>
            <li><Link href="/about" className={styles.link}>Acerca</Link></li>
            <li><Link href="/catalogo" className={styles.link}>Catalogo</Link></li>
            <li><Link href="/contact" className={styles.link}>Contacto</Link></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Contáctanos</h3>
          <p className={styles.text}>Email: <a href="mailto:contacto@empresa.com" className={styles.contactLink}>contacto@empresa.com</a></p>
          <p className={styles.text}>Teléfono: <a href="tel:+1234567890" className={styles.contactLink}>+123 456 7890</a></p>
          <p className={styles.text}>Dirección: Calle Principal 123, Ciudad</p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Síguenos</h3>
          <div className={styles.social}>
            <a href="https://facebook.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <FaFacebook className={styles.socialIcon} />
              Facebook
            </a>
            <a href="https://twitter.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <FaTwitter className={styles.socialIcon} />
              Twitter
            </a>
            <a href="https://instagram.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <FaInstagram className={styles.socialIcon} />
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.text}>
          © {new Date().getFullYear()} Empresa. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}