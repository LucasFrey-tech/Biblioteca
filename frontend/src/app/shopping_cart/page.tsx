'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/shoppingCart.module.css';


import { useParams } from 'next/navigation';

interface BookI {
    id: number;
    title: string;
    author: string;
    image: string;
    price: number;
    virtual: boolean;
    amount: number;
}


export default function ShoppingCartPage() {
    const params = useParams();
    const [booksCartShopping, setBooksCartShopping] = useState<BookI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    // let userId = 0;

    useEffect(() => {

        // userId = Number(localStorage.getItem('userId'));
        // console.log(userId);

        // if (userId === null) {
        //     setError('ID del usuario no proporcionado o inválido.');
        //     setLoading(false);
        //     return;
        // }

        const id = localStorage.getItem('userId');
        if (id) {
            setUserId(Number(id));
        } else {
            setError('ID del usuario no proporcionado o inválido.');
            setLoading(false);
        }

        if (userId === null) return;
        
        const fetchData = async () => {
            try {
                const resCart = await fetch(`http://localhost:3001/shopping-cart/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!resCart.ok) {
                    throw new Error('No se pudo cargar el carrito');
                }

                const cartData: BookI[] = await resCart.json();

                setBooksCartShopping(cartData);


            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setError('Error al cargar el carrito');
            } finally {
                setLoading(false);
            }
        };
        console.log("2", userId);

        fetchData();
    }, [userId]);


    const updateCartItem = async (idBook: number, newAmount: number) => {
        try {
            const existingItem = booksCartShopping.find(item => item.id === idBook);

            if (existingItem) {
                const updatedItem = { ...existingItem, amount: newAmount };

                await fetch(`http://localhost:3001/shopping-cart/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedItem),
                });

                setBooksCartShopping(booksCartShopping.map(item =>
                    item.id === idBook ? updatedItem : item
                ));
            }
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const removeFromCart = async (id: number) => {
        try {
            await fetch(`http://localhost:3001/shopping-cart/${id}`, {
                method: 'DELETE',
            });

            setBooksCartShopping(booksCartShopping.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const calculateTotal = () => {
        return booksCartShopping.reduce((total, item) => {
            const book = booksCartShopping.find(b => b.id === item.id);
            return total + (book ? book.price * item.amount : 0);
        }, 0);
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.productsColumn}>
                    <div className={styles.cartSection}>
                        <h2 className={styles.sectionTitle}>Productos</h2>

                        {booksCartShopping.length === 0 ? (
                            <p className={styles.emptyCart}>Carrito de compras vacio</p>
                        ) : (
                            <div className={styles.itemsContainer}>
                                {booksCartShopping.map(item => {
                                    const book = booksCartShopping.find(b => b.id === item.id);
                                    if (!book) return null;

                                    return (
                                        <div key={item.id} className={styles.cartItem}>
                                            <div className={styles.itemImage}>
                                                <img src={book.image || '/placeholder.png'} alt={book.title} />
                                            </div>
                                            <div className={styles.itemDetails}>
                                                <h3>{book.title}</h3>
                                                <p>by {book.author}</p>
                                                <div className={styles.price}>${book.price.toLocaleString()}</div>

                                                <div className={styles.quantityControl}>
                                                    <button
                                                        onClick={() => updateCartItem(item.id, Math.max(1, item.amount - 1))}
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
                                                    <button className={styles.compareButton}>Comparar ahora</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>

                <div className={styles.summaryColumn}>
                    <div className={styles.summarySection}>
                        <h2 className={styles.sectionTitle}>Resumen de compra</h2>
                        <div className={styles.summaryDetails}>
                            <div className={styles.summaryRow}>
                                <span>Productos ({booksCartShopping.length})</span>
                                <span>${calculateTotal().toLocaleString()}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Envío</span>
                                <span className={styles.freeShipping}>Gratis</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Impuestos</span>
                                <span>$0</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.totalSection}>
                        <div className={styles.totalRow}>
                            <span className={styles.totalTitle}>Total</span>
                            <span className={styles.totalAmount}>${calculateTotal().toLocaleString()}</span>
                        </div>
                        <button className={styles.checkoutButton}>Continuar compra</button>
                    </div>
                </div>
            </div>
        </div>
    );
}