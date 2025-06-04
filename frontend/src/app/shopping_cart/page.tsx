'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/shoppingCart.module.css';

interface Book {
    id: number;
    title: string;
    author: string;
    image: string;
    price: number;
    amount?: number;
    subscriber_exclusive: boolean;
}

interface ShoppingCartItem {
    id: number;
    idUser: number;
    idBook: number;
    amount: number;
    book?: Book;
}

export default function ShoppingCartPage() {
    const [cartItems, setCartItems] = useState<ShoppingCartItem[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId] = useState(1);

    useEffect(() => {
        const fetchCartData = async () => {
            try {

                const cartResponse = await fetch(`http://localhost:3000/shopping-cart/${userId}`);
                const cartData = await cartResponse.json();

                if (cartData) {
                    setCartItems(Array.isArray(cartData) ? cartData : [cartData]);


                    const bookIds = Array.isArray(cartData)
                        ? cartData.map(item => item.idBook)
                        : [cartData.idBook];

                    if (bookIds.length > 0) {
                        const booksResponse = await fetch(`http://localhost:3000/books?ids=${bookIds.join(',')}`);
                        const booksData = await booksResponse.json();
                        setBooks(booksData);
                    }
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [userId]);

    const updateCartItem = async (idBook: number, newAmount: number) => {
        try {
            const existingItem = cartItems.find(item => item.idBook === idBook);

            if (existingItem) {
                const updatedItem = { ...existingItem, amount: newAmount };
                await fetch(`http://localhost:3000/shopping-cart/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedItem),
                });

                setCartItems(cartItems.map(item =>
                    item.idBook === idBook ? updatedItem : item
                ));
            }
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const removeFromCart = async (id: number) => {
        try {
            await fetch(`http://localhost:3000/shopping-cart/${id}`, {
                method: 'DELETE',
            });

            setCartItems(cartItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const book = books.find(b => b.id === item.idBook);
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

                        {cartItems.length === 0 ? (
                            <p className={styles.emptyCart}>Carrito de compras vacio</p>
                        ) : (
                            <div className={styles.itemsContainer}>
                                {cartItems.map(item => {
                                    const book = books.find(b => b.id === item.idBook);
                                    if (!book) return null;

                                    return (
                                        <div key={item.id} className={styles.cartItem}>
                                            <div className={styles.itemImage}>
                                                <img src={book.image || '/book-placeholder.jpg'} alt={book.title} />
                                            </div>
                                            <div className={styles.itemDetails}>
                                                <h3>{book.title}</h3>
                                                <p>by {book.author}</p>
                                                <div className={styles.price}>${book.price.toLocaleString()}</div>

                                                <div className={styles.quantityControl}>
                                                    <button
                                                        onClick={() => updateCartItem(item.idBook, Math.max(1, item.amount - 1))}
                                                        className={styles.quantityButton}
                                                    >
                                                        -
                                                    </button>
                                                    <span className={styles.quantity}>{item.amount}</span>
                                                    <button
                                                        onClick={() => updateCartItem(item.idBook, item.amount + 1)}
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
                                <span>Productos ({cartItems.length})</span>
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