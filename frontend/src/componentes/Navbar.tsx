import Link from "next/link";
/*import Image from "next/image";*/
import styles from '../styles/navbar.module.css';

export default function Navbar() {
    return (
        <header className={styles.Header}>
            <div className={styles.TituloPagina}>
                <h1>alejandria</h1>
                <h2>Biblioteca Virtual</h2>
            </div>
            <nav className={styles.Navegacion}>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/inicio">Novedades</Link>
                    </li>
                    <li>
                        <Link href="/catalogo">Catalogo</Link>
                    </li>
                    <li>
                        <Link href="/libreria">Libreria</Link>
                    </li>
                    <li>
                        <Link href="/about">Sobre Nosotros</Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.Usuario}>
                <a className={styles.boton} href="">acceder</a>
            </div>
        </header>
    );
}