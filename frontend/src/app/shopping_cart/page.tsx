'use client'

import React, { useEffect, useState, useRef } from "react";
import styles from '../../styles/shoppingCart.module.css';
import Image from 'next/image';

import { useParams } from "next/navigation";
import { BaseApi } from "@/API/baseApi";
import { ShoppingCartBook } from "@/API/types/shopping_cart";
import { PurchaseItem } from "@/API/types/purchase";

const groupCartItems = (items: ShoppingCartBook[]) => {
    const grouped: { [key: string]: ShoppingCartBook } = {};

    items.forEach(item => {
        const key = `${item.id}-${item.virtual}`;
        if (grouped[key]) {
            grouped[key].amount += item.amount;
        } else {
            grouped[key] = { ...item };
        }
    });
    return Object.values(grouped);
};


export default function ShoppingCartPage() {
    const params = useParams();
    const apiRef = useRef(new BaseApi());
    const [booksCartShopping, setBooksCartShopping] = useState<ShoppingCartBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) {
            setUserId(Number(id));
        } else {
            setError('ID del usuario no proporcionado o inválido.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (userId === null) return;

        const fetchData = async () => {
            try {
                const cartData = await apiRef.current.shoppingCart.findByUser(userId);
                console.log('Datos crudos del carrito:', cartData); // <-- Añade esto
                if (cartData) {
                    setBooksCartShopping(groupCartItems(cartData));
                }
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setError('Error al cargar el carrito');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const updateCartItem = async (idBookCart: number, newAmount: number) => {
        try {
            if (!userId) throw new Error('Usuario no identificado');

            if (newAmount <= 0) {
                // Si la nueva cantidad es 0 o menos, eliminar el ítem
                await apiRef.current.shoppingCart.delete(idBookCart);
                setBooksCartShopping(prevItems =>
                    prevItems.filter(item => item.id !== idBookCart)
                );
            } else {
                // Si la cantidad es válida, actualizar
                await apiRef.current.shoppingCart.update(idBookCart, { amount: newAmount });

                setBooksCartShopping(prev =>
                    prev.map(item =>
                        item.id === idBookCart ? { ...item, amount: newAmount } : item
                    )
                );
            }
        } catch (error) {
            console.error('Error actualizando ítem del carrito:', error);
        }
    };

    const removeFromCart = async (idBookCart: number) => {
        try {
            await apiRef.current.shoppingCart.delete(idBookCart);

            setBooksCartShopping(prevItems =>
                prevItems.filter(item => item.id !== idBookCart)
            );
        } catch (error) {
            console.error('Error eliminando ítem del carrito:', error);
        }
    };

    const calculateTotal = () => {
        return booksCartShopping.reduce((total, item) => {
            return total + item.price * item.amount;
        }, 0);
    };

    const handlePurchase = async () => {
        if (!userId) {
            setPurchaseMessage('Error: Usuario no identificado');
            return;
        }

        try {
            const cartData = await apiRef.current.shoppingCart.findByUser(userId);
            if (!cartData || cartData.length === 0) {
                setPurchaseMessage('Error: El carrito está vacío');
                return;
            }

            const itemsToPurchase: PurchaseItem[] = cartData.map(item => ({
                cartItemId: item.id,
                amount: item.amount,
                virtual: item.virtual,
            }));

            await apiRef.current.purchase.processPurchase(userId, itemsToPurchase);

            setBooksCartShopping([]);
            setPurchaseMessage('Compra realizada con éxito');
        } catch (error: unknown) {
            console.error('Error procesando la compra:', error);
            // Extraemos el mensaje si error es un objeto con message, o usamos un mensaje genérico
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setPurchaseMessage(`Error al procesar la compra: ${errorMessage}`);
        }
    }

    if (loading) return <p>Cargando carrito...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.productsColumn}>
                    <div className={styles.cartSection}>
                        <h2 className={styles.sectionTitle}>Productos</h2>

                        {booksCartShopping.length === 0 ? (
                            <p className={styles.emptyCart}>Carrito de compras vacío</p>
                        ) : (
                            <div className={styles.itemsContainer}>
                                {booksCartShopping.map(item => (
                                    <div key={`${item.id}-${item.virtual}`} className={styles.cartItem}>
                                        <div className={styles.itemImage}>
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                className={item.virtual ? styles.ebookImage : ''}
                                                width = {100}
                                                height = {150}
                                                placeholder="blur"
                                                blurDataURL="/libros/placeholder.png"
                                            />
                                            {item.virtual && (
                                                <span className={styles.ebookBadge}>eBook</span>
                                            )}
                                        </div>
                                        <div className={styles.itemDetails}>
                                            <h3>{item.title}</h3>
                                            <p>by {item.author}</p>
                                            <div className={styles.formatInfo}>
                                                Formato: {item.virtual ? 'Digital (eBook)' : 'Físico'}
                                            </div>
                                            <div className={styles.price}>${item.price.toLocaleString()}</div>

                                            <div className={styles.quantityControl}>
                                                <button
                                                    onClick={() => {
                                                        if (item.amount > 1) {
                                                            updateCartItem(item.id, Math.max(1, item.amount - 1))
                                                        } else {
                                                            removeFromCart(item.id);
                                                        }
                                                    }}

                                                    className={styles.quantityButton}
                                                >
                                                    -
                                                </button>
                                                <span className={styles.quantity}>{item.amount}</span>
                                                <button
                                                    onClick={() => updateCartItem(item.id, item.amount + 1)}
                                                    className={styles.quantityButton}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className={styles.itemActions}>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className={styles.removeButton}
                                                >
                                                    Eliminar
                                                </button>
                                                {!item.virtual && (
                                                    <button className={styles.compareButton}>
                                                        Comparar ahora
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.summaryColumn}>
                    <div className={styles.summarySection}>
                        <h2 className={styles.sectionTitle}>Resumen de compra</h2>
                        <div className={styles.summaryDetails}>
                            <div className={styles.summaryRow}>
                                <span>Productos ({booksCartShopping.reduce((acc, item) => acc + item.amount, 0)})</span>
                                <span>${calculateTotal().toLocaleString()}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Envío</span>
                                <span className={styles.freeShipping}>
                                    {booksCartShopping.some(item => !item.virtual) ? 'Gratis' : 'No aplica'}
                                </span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Impuestos</span>
                                <span>
                                    ${booksCartShopping.some(item => item.virtual)
                                        ? (calculateTotal() * 0.21).toLocaleString()
                                        : '0'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.totalSection}>
                        <div className={styles.totalRow}>
                            <span className={styles.totalTitle}>Total</span>
                            <span className={styles.totalAmount}>
                                ${calculateTotal().toLocaleString()}
                            </span>
                        </div>
                        <button
                            className={styles.checkoutButton}
                            disabled={booksCartShopping.length === 0}
                            onClick={handlePurchase}
                        >
                            Continuar compra
                        </button>
                        {booksCartShopping.some(item => item.virtual) && (
                            <p className={styles.digitalNote}>
                                Los libros digitales estarán disponibles inmediatamente después del pago
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
