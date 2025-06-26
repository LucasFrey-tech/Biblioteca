'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

export default function VentasPanel(): React.JSX.Element {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const apiRef = useRef<BaseApi | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) apiRef.current = new BaseApi(token);

        if (apiRef.current) {
          const purchasesData = await apiRef.current.purchase.getAll();
          setPurchases(purchasesData || []);
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
  }, []);

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

  const groupedPurchases = purchases.reduce((acc, purchase) => {
    const key = `${purchase.id_user}-${purchase.purchaseDate.toString()}`;
    if (!acc[key]) {
      acc[key] = {
        id_user: purchase.id_user,
        username: purchase.username,
        purchaseDate: purchase.purchaseDate,
        items: [purchase],
        total: purchase.price * purchase.amount
      };
    } else {
      acc[key].items.push(purchase);
      acc[key].total += purchase.price * purchase.amount;
    }
    return acc;
  }, {} as Record<string, {
    id_user: number;
    username: string;
    purchaseDate: Date;
    items: Purchase[];
    total: number;
  }>);

  const purchaseGroups = Object.values(groupedPurchases);

  // Paginación
  const totalPages = Math.ceil(purchaseGroups.length / itemsPerPage);
  const currentGroups = purchaseGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className={styles.panelContainer}>
        <h2>Cargando ventas...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.panelContainer}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.panelContainer}>
      <h2 className={styles.title}>Historial de Ventas</h2>

      {purchaseGroups.length === 0 ? (
        <p className={styles.emptyMessage}>No hay ventas registradas</p>
      ) : (
        <>
          <div className={styles.purchasesContainer}>
            {currentGroups.map((group, index) => (
              <div key={index} className={styles.purchaseGroup}>
                <div className={styles.purchaseHeader}>
                  <h3>Compra del usuario: {group.username}</h3>
                  <div className={styles.purchaseMeta}>
                    <span>Fecha: {formatDate(group.purchaseDate)}</span>
                    <span className={styles.total}>Total: ${group.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className={styles.itemsGrid}>
                  {group.items.map((item, itemIndex) => (
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
                        <h4>{item.title}</h4>
                        <p>Autor: {item.author}</p>
                        <p>Precio unitario: ${item.price.toFixed(2)}</p>
                        <p>Cantidad: {item.amount}</p>
                        <p>Subtotal: ${(item.price * item.amount).toFixed(2)}</p>
                        <p>Formato: {item.virtual ? 'Digital' : 'Físico'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Pagination className="pt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
