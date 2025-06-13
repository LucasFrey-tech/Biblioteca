'use client';
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import styles from '../../styles/navbar.module.css';
import Image from "next/image";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

import { BaseApi } from "@/API/baseApi";
import { User } from "@/API/types/user";

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [menuDropDown, setDropDown] = useState<boolean>();
    const [user, setUser] = useState<User>();
    const router = useRouter();

    const refAPI = useRef<BaseApi | null>(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);
    const toggleMenu = () => setDropDown(!menuDropDown);

    const closeSession = () => {
        localStorage.removeItem('token');
        setDropDown(false);
        router.push('/login');
    };

    const handleProfileClick = () => {
        if (user?.id) {
            router.push(`/Perfil/${user.id}`);
            setDropDown(false);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                // const admin = localStorage.getItem('admin');

                if (!token || !userId) {
                    console.warn('No hay token o userId en localStorage');
                    return;
                }
                const api = new BaseApi(token);
                refAPI.current = api;

                const userData = await api.users.getOne(Number(userId));
                setUser(userData);


                console.log(userData);

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
                    <Link href="/inicio">
                        <h1>alejandria</h1>
                        <h2>Biblioteca Virtual</h2>
                    </Link>
                </div>

                <nav className={styles.Navegacion}>
                    <ul className={styles.navList}>
                        <li><Link href="/inicio">Novedades</Link></li>
                        <li><Link href="/catalogo">Catalogo</Link></li>
                        <li><Link href="/libreria">Libreria</Link></li>
                        <li><Link href="/about">Sobre Nosotros</Link></li>
                    </ul>
                </nav>

                <div className={styles.Usuario}>
                    {user ? (
                        <div className={styles.menuDesplegableConCarrito}>
                            <button className={styles.nombreUsuario} onClick={toggleMenu}>{user.username}</button>
                            {menuDropDown && (
                                <div className={styles.dropDownMenu}>
                                    <button onClick={handleProfileClick}>Mi Perfil</button>
                                    {user.admin && (
                                        <button onClick={() => router.push('/adminPanel')}>Panel de Admin</button>
                                    )}
                                    <button onClick={closeSession}>Cerrar Sesion</button>
                                </div>
                            )}
                            <Link href="/shopping_cart" className={styles.cartButton}>
                                <div className={styles.cartIconContainer}>
                                    <Image
                                        src="/logos/cart.png"
                                        alt="Carrito"
                                        width={28}
                                        height={28}
                                    />
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <a className={styles.boton} href="http://localhost:3000/login">Acceder</a>
                    )}
                </div>

                <button className={styles.menuButton} onClick={toggleSidebar}>
                    <Image
                        src="/logos/menu.png"
                        alt="menu"
                        width={32}
                        height={32}
                    />
                </button>
            </header>

            <div
                className={`${styles.sidebarBackdrop} ${isSidebarOpen ? styles.active : ''}`}
                onClick={closeSidebar}
            />

            <div className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ''}`}>
                <ul className={styles.sidebarList}>
                    <li><Link href="/inicio" onClick={closeSidebar}>Novedades</Link></li>
                    <li><Link href="/catalogo" onClick={closeSidebar}>Catalogo</Link></li>
                    <li><Link href="/libreria" onClick={closeSidebar}>Libreria</Link></li>
                    <li><Link href="/about" onClick={closeSidebar}>Sobre Nosotros</Link></li>


                    {user ? (
                        <>
                            <li>
                                <Link href="/shopping_cart" onClick={closeSidebar} className={styles.cartButtonSidebar}>
                                    <div className={styles.cartIconContainer}>
                                        <Image
                                            src="/logos/cart.png"
                                            alt="Carrito"
                                            width={28}
                                            height={28}
                                        />
                                    </div>
                                </Link>
                            </li>
                            <li><button onClick={handleProfileClick}>Mi Perfil</button></li>
                            {user.admin && (
                                <li><button onClick={() => router.push('/adminPanel')}>Panel de Admin</button></li>
                            )}
                            <li><button onClick={closeSession}>Cerrar Sesión</button></li>
                        </>
                    ) : (
                        <li>
                            <Link href="http://localhost:3000/login" onClick={closeSidebar} className={styles.boton}>
                                Acceder
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}
{/* <a href="http://localhost:3000/login" onClick={closeSidebar} className={styles.boton}>Acceder</a> */ }