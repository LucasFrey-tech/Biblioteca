'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import styles from '../../styles/navbar.module.css';
import { useUser } from "@/app/context/UserContext";
import SubscriptionDialog from "./subscriptionPanel";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuDropDown, setDropDown] = useState(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);

  const { user, setUser } = useUser();
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleMenu = () => setDropDown(!menuDropDown);

  const closeSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    setDropDown(false);
    router.push('/login');
  };

  const handleProfileClick = () => {
    if (user?.sub) {
      router.push(`/Perfil/${user.sub}`);
      setDropDown(false);
    }
  };

  const handleSubscription = async () => {
    if (false) {
      setDropDown(false);
      setShowSubscriptionDialog(true); // Mostrar diálogo
    } else {
      const result = await Swal.fire({
        title: "No tienes subscripcion 🥲",
        icon: "question",
        html: `<h1>¡Hola ${user?.username}, deseas comprar una por 1 mes, al valor de (subscripcion.valor)?</h1>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Comprar',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancelar',
      });

      if (result.isConfirmed) {
        await Swal.fire({
          title: '¡Suscripción hecha!',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.TituloPagina}>
          <Link href="/inicio">
            <>
              <h1>alejandria</h1>
              <h2>Biblioteca Virtual</h2>
            </>
          </Link>
        </div>

        <nav className={styles.Navegacion}>
          <ul className={styles.navList}>
            <li><Link href="/inicio">Novedades</Link></li>
            <li><Link href="/catalogo">Catálogo</Link></li>
            <li><Link href="/libreria">Librería</Link></li>
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
                  <button onClick={handleSubscription}>Administrar subscripción</button>
                  <button onClick={closeSession}>Cerrar Sesión</button>
                </div>
              )}
              <Link href="/shopping_cart" className={styles.cartButton}>
                <div className={styles.cartIconContainer}>
                  <Image src="/logos/cart.png" alt="Carrito" width={28} height={28} />
                </div>
              </Link>
            </div>
          ) : (
            <button className={styles.boton} onClick={() => router.push('/login')}>Acceder</button>
          )}
        </div>

        <button className={styles.menuButton} onClick={toggleSidebar}>
          <Image src="/logos/menu.png" alt="menu" width={32} height={32} />
        </button>
      </header>

      <div
        className={`${styles.sidebarBackdrop} ${isSidebarOpen ? styles.active : ''}`}
        onClick={closeSidebar}
      />

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ''}`}>
        <ul className={styles.sidebarList}>
          <li><Link href="/inicio" onClick={closeSidebar}>Novedades</Link></li>
          <li><Link href="/catalogo" onClick={closeSidebar}>Catálogo</Link></li>
          <li><Link href="/libreria" onClick={closeSidebar}>Librería</Link></li>
          <li><Link href="/about" onClick={closeSidebar}>Sobre Nosotros</Link></li>

          {user ? (
            <>
              <li>
                <Link href="/shopping_cart" onClick={closeSidebar} className={styles.cartButtonSidebar}>
                  <div className={styles.cartIconContainer}>
                    <Image src="/logos/cart.png" alt="Carrito" width={28} height={28} />
                  </div>
                </Link>
              </li>
              <li><button onClick={handleProfileClick}>Mi Perfil</button></li>
              {user.admin && (
                <li><button onClick={() => { closeSidebar(); router.push('/adminPanel'); }}>Panel de Admin</button></li>
              )}
              <li><button onClick={handleSubscription}>Administrar subscripción</button></li>
              <li><button onClick={closeSession}>Cerrar Sesión</button></li>
            </>
          ) : (
            <li><button className={styles.boton} onClick={() => { closeSidebar(); router.push('/login'); }}>Acceder</button></li>
          )}
        </ul>
      </div>

      {/* Mostrar el dialog de suscripción */}
      {showSubscriptionDialog && (
        <SubscriptionDialog
          onClose={() => setShowSubscriptionDialog(false)}
          buyDate="2025-06-01"
          expiryDate="2025-07-01"
        />
      )}
    </>
  );
}

