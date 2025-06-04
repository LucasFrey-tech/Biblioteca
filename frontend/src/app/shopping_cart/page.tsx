// 'use client';

// import { useEffect, useState } from 'react';
// import styles from '../../styles/shoppingCart.module.css'


// type CartItem = {
//   id: number;
//   idUser: number;
//   idBook: number;
//   amount: number;
//   book: {
//     id: number;
//     title: string;
//     image: string;
//     price: number;
//   };
// }

// export default function ShoppingCartPage() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [total, setTotal] = useState<number>(0);

//   useEffect(() => {
//     const fetchCart = async () => {
//       const userId = 1; // Reemplazar por el ID dinámico del usuario autenticado
//       const res = await fetch(`http://localhost:3001/shopping-cart/${userId}`);
//       const data = await res.json();
//       setCartItems(data);

//       const calculatedTotal = data.reduce((acc: number, item: CartItem) => {
//         return acc + item.book.price * item.amount;
//       }, 0);
//       setTotal(calculatedTotal);
//     };

//     fetchCart();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Carrito de Compras</h1>

//       <div className={styles.cartList}>
//         {cartItems.map(item => (
//           <div key={item.id} className={styles.cartItem}>
//             <img src={item.book.image} alt={item.book.title} className={styles.bookImage} />
//             <div className={styles.details}>
//               <h2>{item.book.title}</h2>
//               <p>Cantidad: {item.amount}</p>
//               <p>Precio unitario: ${item.book.price.toFixed(2)}</p>
//               <p className={styles.subtotal}>
//                 Subtotal: ${(item.book.price * item.amount).toFixed(2)}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className={styles.totalContainer}>
//         <h2>Total a pagar: ${total.toFixed(2)}</h2>
//         <button className={styles.checkoutBtn}>Proceder al Pago</button>
//       </div>
//     </div>
//   );
// }