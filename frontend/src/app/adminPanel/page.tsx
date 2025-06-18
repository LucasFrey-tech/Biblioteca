'use client';

import { useState } from "react";
import styles from '../../styles/panelAdmin.module.css';
import UsersPanel from "./usersPanel";
import BooksPanel from "./booksPanel";


export default function PanelAdmin() {
  const [activeTab, setActiveTab] = useState<'users' | 'books'|'novedades'|'subscription'|'ventas'>('users');

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.titulo}>PANEL DE ADMINISTRADOR</h1>
      <div className={styles.navButtons}>
        <button
          className={`${styles.tabButton} ${activeTab === 'novedades' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('novedades')}
        >
          Novedades
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'subscription' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('subscription')}
        >
          Subscripción
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'ventas' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('ventas')}
        >
          Ventas
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'users' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Usuarios
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'books' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Libros
        </button>
      </div>
      <div className={styles.contenido}>
        {activeTab === 'users' && (
          <UsersPanel/>
        )}

        {activeTab === "books" && (
          <BooksPanel/>
        )}
      </div>
    </div>
  );
}




