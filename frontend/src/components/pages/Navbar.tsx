'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '../../styles/navbar.module.css';
import Image from "next/image";

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [username, setUsername] = useState<string>();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <>
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
                    {username ? (
                        <span className={styles.nombreUsuario}>{username}</span>
                    ) : (
                        <a className={styles.boton} href="http://localhost:3000/login">acceder</a>
                    )}
                </div>

                <button className={styles.menuButton} onClick={toggleSidebar}>
                    <Image
                        src="/logos/menu.png"
                        alt="menu"
                        width={32} // Ajusta según el tamaño deseado
                        height={32} // Ajusta según el tamaño deseado
                    />
                </button>
            </header>

            <div
                className={`${styles.sidebarBackdrop} ${isSidebarOpen ? styles.active : ''}`}
                onClick={closeSidebar}
            />

            <div className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ''}`}>
                <ul className={styles.sidebarList}>
                    <li>
                        <Link href="/inicio" onClick={closeSidebar}>Novedades</Link>
                    </li>
                    <li>
                        <Link href="/catalogo" onClick={closeSidebar}>Catalogo</Link>
                    </li>
                    <li>
                        <Link href="/libreria" onClick={closeSidebar}>Libreria</Link>
                    </li>
                    <li>
                        <Link href="/about" onClick={closeSidebar}>Sobre Nosotros</Link>
                    </li>
                    <li>
                        <Link
                            href="http://localhost:3000/login"
                            onClick={closeSidebar}
                            className={styles.boton}
                        >
                            Acceder
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

{/* <a href="http://localhost:3000/login" onClick={closeSidebar} className={styles.boton}>Acceder</a> */ }