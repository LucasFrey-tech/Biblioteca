'use client'

import React, { useEffect, useState, useRef } from "react";
import styles from '../../styles/shoppingCart.module.css';
import Image from 'next/image';
import { useParams } from "next/navigation";
import { BaseApi } from "@/API/baseApi";
import { ShoppingCartBook } from "@/API/types/shopping_cart";
import { PurchaseItem } from "@/API/types/purchase";
import { User } from "@/API/types/user";
import Swal from "sweetalert2";

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

    const apiRef = useRef(new BaseApi());
    const [booksCartShopping, setBooksCartShopping] = useState<ShoppingCartBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);
    const [user, setUser] = useState<User>();
    const [discountPercentage, setDiscountPercentage] = useState<number>(0);

    const isSubscriber = user?.userSubscriptions?.some(sub => sub.ongoing);

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
                // 1. Primero cargamos el usuario
                const userData = await apiRef.current.users.getOne(userId);
                setUser(userData);

                // 2. Si es subscriptor, cargamos el descuento
                if (userData?.userSubscriptions?.some(sub => sub.ongoing)) {
                    try {
                        const discountData = await apiRef.current.userSubscriptionDiscount.getOne(1);
                        if (discountData?.discount) {
                            setDiscountPercentage(discountData.discount);
                        }
                    } catch (discountError) {
                        console.log("No se pudo cargar el descuento para subscriptores", discountError);
                    }
                }

                // 3. Finalmente cargamos el carrito
                const cartData = await apiRef.current.shoppingCart.findByUser(userId);
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

    const descuentoSubscriptor = (total: number): number => {
        if (!user || !isSubscriber || discountPercentage <= 0) return 0;
        return total * (discountPercentage / 100);
    };

    const calculateSubtotal = () => {
        return booksCartShopping.reduce((total, item) => {
            return total + item.price * item.amount;
        }, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discount = descuentoSubscriptor(subtotal);
        return subtotal - discount;
    };

    const updateCartItem = async (idBookCart: number, newAmount: number) => {
        try {
            if (!userId) throw new Error('Usuario no identificado');

            if (newAmount <= 0) {
                await apiRef.current.shoppingCart.delete(idBookCart);
                setBooksCartShopping(prevItems =>
                    prevItems.filter(item => item.id !== idBookCart)
                );
            } else {
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

            const virtualBooks = cartData.filter(item => item.virtual);
            if (virtualBooks.length > 0) {
                try {
                    await Promise.all(
                        virtualBooks.map(async (book) => {
                            for (let i = 0; i < book.amount; i++) {
                                await apiRef.current.libreria.create({
                                    idUser: userId,
                                    idBook: book.idBook,
                                });
                            }
                        })
                    );
                } catch (libraryError) {
                    console.error('Error agregando libros a la libreria:', libraryError);
                }
            }

            setBooksCartShopping([]);

            Swal.fire({
                title: "Éxito",
                text: "Compra exitosa! Los libros digitales estarán disponibles en tu librería.",
                icon: "success",
                timer: 3500,
                showConfirmButton: false
            });
        } catch (error: unknown) {
            console.error('Error procesando la compra:', error);
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
                                                width={100}
                                                height={150}
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

                                            {!item.virtual && (
                                                <>
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
                                                </>
                                            )}

                                            <div className={styles.itemActions}>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className={styles.removeButton}
                                                >
                                                    Eliminar
                                                </button>
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
                                <span>${calculateSubtotal().toLocaleString()}</span>
                            </div>

                            {isSubscriber && discountPercentage > 0 && (
                                <div className={styles.summaryRow}>
                                    <span>
                                        Descuento suscriptor (<span className="font-semibold">{discountPercentage}%</span>)
                                    </span>


                                    <span className={styles.discount}>
                                        -${descuentoSubscriptor(calculateSubtotal()).toLocaleString()}
                                    </span>
                                </div>
                            )}

                            <div className={styles.summaryRow}>
                                <span>Envío</span>
                                <span className={styles.freeShipping}>
                                    {booksCartShopping.some(item => !item.virtual) ? 'Gratis' : 'No aplica'}
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
                            Pagar
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