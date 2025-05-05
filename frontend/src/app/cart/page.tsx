'use client';

import { useEffect, useState } from "react";
import styles from '../../styles/cart.module.css';

type CartItem = {
  id_cart: number;
  book: {
    id_book: number;
    title: string;
    price: number;
  };
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = 1;

  useEffect(() => {
    async function loadCart() {
      try {
        const response = await fetch(`http://localhost:3001/cart/${userId}`);
        if (!response.ok) {
          throw new Error('Error al cargar el carrito');
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        setError('Error al cargar el carrito');
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, []);

  const removeFromCart = async (id_cart: number) => {
    try {
      const response = await fetch(`http://localhost:3001/cart/${id_cart}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar del carrito');
      }
      setCartItems(cartItems.filter((item) => item.id_cart !== id_cart));
    } catch (error) {
      setError('Error al eliminar del carrito');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Carrito</h1>
      {cartItems.length === 0 ? (
        <p>Carrito vacio. pobre</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item.id_cart}>
              {item.book.title} - ${item.book.price.toFixed(2)}
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(item.id_cart)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}