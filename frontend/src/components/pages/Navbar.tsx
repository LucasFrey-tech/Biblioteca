'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '../../styles/navbar.module.css';
import Image from "next/image";
import { jwtDecode } from 'jwt-decode';
import { useRouter} from 'next/navigation';

interface User {
  sub: number;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<User | null>();
    const [menuDropDown, setDropDown] = useState<boolean>();
    const router = useRouter();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };
    
    const toggleMenu = () => {
        setDropDown(!menuDropDown);
    };

    const closeSession = () => {
        localStorage.removeItem('token');
        setUser(null);
        setDropDown(false);
        router.push('/login');
    };

    ////////////////////////////////////////
    const handleProfileClick = () => {
        if (user?.sub) {
            router.push(`/Perfil/${user.sub}`);
            setDropDown(false);
        }
    };
    ///////////////////////////////////////

    useEffect(() => {
        const getUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No hay token en localStorage');
                return;
            }

            const decoded = jwtDecode<User>(token);
            setUser(decoded);
        } catch (error) {
            console.error('Hubo un error:', error);
        }
    };

    getUser();
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
                        <div className={styles.menuDesplegable}>
                            <button className={styles.nombreUsuario} onClick={toggleMenu}>{user.username}</button>
                            {menuDropDown && (
                                <div className={styles.dropDownMenu}>
                                    {user && (
                                        <button onClick={handleProfileClick}>
                                            Mi Perfil
                                        </button>
                                    )}
                                    <button onClick={closeSession}>Cerrar Sesion</button>
                                </div>
                            )}
                        </div>
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