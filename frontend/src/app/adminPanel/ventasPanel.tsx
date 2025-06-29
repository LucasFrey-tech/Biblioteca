'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import styles from '../../styles/ventasPanel.module.css';
import { BaseApi } from "@/API/baseApi";
import { Purchase } from "@/API/types/purchase";
import Swal from "sweetalert2";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10; // Consistente con el backend

export default function VentasPanel(): React.JSX.Element {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState(''); // Nuevo estado para búsqueda

  const apiRef = useRef<BaseApi | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) apiRef.current = new BaseApi(token);

        if (apiRef.current) {
          const response = await apiRef.current.purchase.getAllPaginated(currentPage, ITEMS_PER_PAGE, search);
          console.log('Respuesta de compras paginadas:', response);
          if (!response || !Array.isArray(response.items)) {
            console.error('Respuesta inválida de la API:', response);
            setPurchases([]);
            setTotalItems(0);
            throw new Error('Respuesta inválida de la API');
          }
          setPurchases(response.items);
          setTotalItems(response.total);
        } else {
          throw new Error('API client not initialized');
        }
      } catch (error) {
        console.error('Error al cargar las compras:', error);
        setError('Error al cargar las compras');
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar las compras',
          icon: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [currentPage, search]); // Dependencias: currentPage y search

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className={styles.panelContainer}>
      <h2 className={styles.title}>Historial de Ventas</h2>
      <Input
        placeholder='Buscar por nombre de usuario'
        className={styles.inputSearch}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // Reiniciar a la primera página al buscar
        }}
      />

      {loading ? (
        <div className={styles.panelContainer}>
          <h2>Cargando ventas...</h2>
        </div>
      ) : error ? (
        <div className={styles.panelContainer}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : purchases.length === 0 ? (
        <p className={styles.emptyMessage}>No hay ventas registradas</p>
      ) : (
        <>
          <div className={styles.purchasesContainer}>
            {purchases.map((purchase, index) => (
              <div key={index} className={styles.purchaseGroup}>
                <div className={styles.purchaseHeader}>
                  <h3>Compra del usuario: {purchase.username}</h3>
                  <div className={styles.purchaseMeta}>
                    <span>Fecha: {formatDate(purchase.purchaseDate)}</span>
                    <span className={styles.total}>
                      Total: ${purchase.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className={styles.itemsGrid}>
                  {purchase.purchaseItems.map((item, itemIndex) => (
                    <div key={itemIndex} className={styles.itemCard}>
                      <div className={styles.itemImage}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={120}
                          className={item.virtual ? styles.ebookImage : ''}
                        />
                        {item.virtual && (
                          <span className={styles.ebookBadge}>eBook</span>
                        )}
                      </div>
                      <div className={styles.itemDetails}>
                        <h4>{item.title} - {item.author}</h4>
                        <p>Formato: {item.virtual ? 'Digital' : 'Físico'}</p>
                        <p>Precio unitario: ${item.price.toFixed(2)}</p>
                        <p>Cantidad: {item.amount}</p>
                        <p>Subtotal: ${(item.price * item.amount).toFixed(2)}</p>
                        <p>Descuento: {(item.subscriptionDiscount || 0).toFixed(0)}%</p>
                        <p>Total Neto: ${(item.price * item.amount * (1 - (item.subscriptionDiscount || 0) / 100)).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 0 && (
            <Pagination className="pt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}