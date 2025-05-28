'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '../../styles/navbar.module.css';
import Image from "next/image";
import { jwtDecode } from 'jwt-decode';

interface User {
  sub: number;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<User>();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };
    
    
    useEffect(() => {
        const obtenerUsuario = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
            console.error('No hay token en localStorage');
            return;
            }

            const { sub: id } = jwtDecode<{ sub: string }>(token);

            const response = await fetch(`http://localhost:3001/users/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            });

            if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Hubo un error:', error);
        }
    };

    obtenerUsuario();
  }, []);

    return (
        <>
            <header className={styles.Header}>
                <div className={styles.TituloPagina}>
                    <a href="http://localhost:3000/inicio">
                        <h1>alejandria</h1>
                        <h2>Biblioteca Virtual</h2>
                    </a>
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
                    {/*Muestra Usuario al iniciar sesion*/}
                    {user ? (
                        <span className={styles.nombreUsuario}>{user.username}</span>
                    ) : (
                        <a className={styles.boton} href="http://localhost:3000/login">Acceder</a>
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