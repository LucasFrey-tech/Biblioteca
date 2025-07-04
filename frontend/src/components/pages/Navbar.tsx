'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import styles from '../../styles/navbar.module.css';
import { useUser } from "@/app/context/UserContext";
import SubscriptionDialog from "./subscriptionPanel";
import { CrownIcon, GemIcon } from "lucide-react";
import { useSubscriptionHandler } from "./useSubscriptionHandler";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuDropDown, setDropDown] = useState(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<{ startDate: string, endDate: string } | null>(null);

  const { user, setUser } = useUser();
  const router = useRouter();
  const { handleSubscription } = useSubscriptionHandler();

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

  const onSubscriptionConfirmed = (startDate: string, endDate: string) => {
    setShowSubscriptionDialog(true);
    setSubscriptionData({ startDate, endDate });
  };

  const handleGemClick = () => {
    handleSubscription(onSubscriptionConfirmed);
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

        <div className={styles.Subscription}>
          <button
            className={`${styles.crownButton} ${styles.hideOnMobile}`}
            onClick={handleGemClick}
          >
            <GemIcon className={styles.crownIcon} />
          </button>
        </div>

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
              <li><button onClick={() => handleSubscription(onSubscriptionConfirmed)}>Suscripción</button></li>
              <li><button onClick={closeSession}>Cerrar Sesión</button></li>
            </>
          ) : (
            <li><button className={styles.boton} onClick={() => { closeSidebar(); router.push('/login'); }}>Acceder</button></li>
          )}
        </ul>
      </div>

      {showSubscriptionDialog && subscriptionData && (
        <SubscriptionDialog
          onClose={() => setShowSubscriptionDialog(false)}
          buyDate={subscriptionData.startDate}
          expiryDate={subscriptionData.endDate}
        />
      )}
    </>
  );
}