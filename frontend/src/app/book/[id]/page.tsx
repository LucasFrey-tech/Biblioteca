'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

import { BaseApi } from "@/API/baseApi";
import { User } from "@/API/types/user";
import { Book } from "@/API/types/book";
import { Review } from "@/API/types/review";

import styles from '../../../styles/BookDetail.module.css';

export default function BookDetail() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book>();
  const [review, setReview] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'physical' | 'ebook'>('physical');
  const [user, setUser] = useState<User>();
  const [amount, setAmount] = useState(1);

  const apiRef = useRef<BaseApi | null>(null);

  useEffect(() => {
    if (!params || !params.id) {
      setError('ID del libro no proporcionado.');
      setLoading(false);
      return;
    }

    const bookId = Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id);

    if (isNaN(bookId)) {
      setError('ID del libro inválido.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const bookData = await (token ? new BaseApi(token) : new BaseApi()).books.getOne(bookId);
        setBook(bookData);

        if (token && userId) {
          const api = new BaseApi(token);
          apiRef.current = api;

          try {
            const userData = await api.users.getOne(Number(userId));
            setUser(userData);
          } catch (userError) {
            console.warn('No se pudo cargar información del usuario:', userError);
            // Opcional: limpiar token si el usuario no existe
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
          }

          try {
            const reviewsData = await api.review.getByBookId(bookId);
            setReview(reviewsData);
          } catch (reviewError) {
            console.warn('No se pudieron cargar las reviews:', reviewError);
          }
        } else {
          const api = new BaseApi();
          const reviewsData = await api.review.getByBookId(bookId);
          setReview(reviewsData);
        }
      } catch (error) {
        console.error('Error al cargar los datos', error);
        setError(error instanceof Error ? error.message : 'Error desconocido al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;
  if (!book) return <p>Libro no encontrado!!!</p>;

  const isSubscriber = user?.userSubscriptions?.some(sub => sub.ongoing);
  const isBlocked = book.subscriber_exclusive && !isSubscriber;

  const showSubscriptionAlert = async () => {
    await Swal.fire({
      icon: 'info',
      title: 'Solo para suscriptores',
      text: 'Este libro es exclusivo para suscriptores.',
      timer: 2500,
      showConfirmButton: false,
    });
  };

  const handleAddToCart = async () => {
    if (isBlocked) {
      await showSubscriptionAlert();
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    if (!book || !apiRef.current) {
      alert('Libro o API no disponible ❌');
      return;
    }

    if (selectedFormat === 'physical' && book.stock <= 0) {
      Swal.fire({
        title: "Sin stock",
        text: "Este libro físico no tiene stock disponible.",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    try {
      const payload = {
        idUser: user.id,
        idBook: book.id,
        amount: selectedFormat === 'physical' ? amount : 1,
        virtual: selectedFormat === 'ebook'
      };

      await apiRef.current.shoppingCart.create(payload);

      Swal.fire({
        title: "Éxito",
        text: "Libro agregado al carrito correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });

    } catch (error) {
      console.error('Error agregando al carrito:', error);
      Swal.fire({
        title: "Error",
        text: "No se pudo agregar el libro al carrito",
        icon: "error",
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  const handleBuyNow = async () => {
    if (isBlocked) {
      await showSubscriptionAlert();
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    if (!book || !apiRef.current) {
      alert('Libro o API no disponible ❌');
      return;
    }

    if (selectedFormat === 'physical' && book.stock <= 0) {
      Swal.fire({
        title: "Sin stock",
        text: "Este libro físico no tiene stock disponible.",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    try {
      const payload = {
        idUser: user.id,
        idBook: book.id,
        amount: selectedFormat === 'physical' ? amount : 1,
        virtual: selectedFormat === 'ebook'
      };

      await apiRef.current.shoppingCart.create(payload);

      Swal.fire({
        title: "Libro agregado al carrito",
        text: "Serás redirigido al carrito.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        router.push('/shopping_cart');
      });

    } catch (error) {
      console.error('Error agregando al carrito:', error);
      Swal.fire({
        title: "Error",
        text: "No se pudo agregar el libro al carrito.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productMain}>
        <div className={`${styles.imageColumn} ${isBlocked ? styles.exclusiveFrame : ''}`}>
          {isBlocked && (
            <span className={styles.exclusiveBadge}>Suscriptores exclusivo</span>
          )}
          <Image
            src={
              typeof book.image === 'string' && book.image.trim() !== ''
                ? book.image
                : '/libros/placeholder.png'
            }
            alt={book.title}
            width={350}
            height={500}
            className={styles.productImage}
            priority
          />
        </div>

        <div className={styles.infoColumn}>
          <h1 className={styles.productTitle}>{book.title}</h1>
          <p className={styles.productAuthor}>Por {book.author}</p>

          <div className={styles.priceStock}>
            <div className={styles.price}>
              {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(book.price)}
            </div>
            <div className={styles.stock}>
              {book.stock > 0 ? (
                <span className={styles.inStock}>En stock: {book.stock} unidades</span>
              ) : (
                <span className={styles.outStock}>Sin stock</span>
              )}
            </div>
          </div>

          <div className={styles.formatButtons}>
            <button
              className={`${styles.formatBtn} ${selectedFormat === 'physical' ? styles.activeFormat : ''}`}
              onClick={() => setSelectedFormat('physical')}
            >
              Físico
            </button>
            <button
              className={`${styles.formatBtn} ${selectedFormat === 'ebook' ? styles.activeFormat : ''}`}
              onClick={() => setSelectedFormat('ebook')}
            >
              eBook
            </button>
          </div>

          {selectedFormat === 'ebook' && (
            <p className={styles.ebookNote}>🛈 Solo una copia virtual por usuario.</p>
          )}

          <div className={styles.purchaseSection}>
            {selectedFormat === 'physical' && (
              <>
                <label htmlFor="amount" className={styles.amountLabel}>Cantidad:</label>
                <input
                  id="amount"
                  type="number"
                  min={1}
                  max={book.stock}
                  value={amount}
                  onChange={e => setAmount(Math.min(book.stock, Math.max(1, Number(e.target.value))))}
                  className={styles.amountInput}
                />
              </>
            )}

            <button className={styles.btnBuy} onClick={handleBuyNow}>
              Comprar ahora
            </button>

            <button className={styles.btnCart} onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>

          <div className={styles.categories}>
            <strong>Categorías:</strong>
            <ul>
              {book.genre.map((g) => (
                <li key={g.id}>{g.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className={styles.descriptionSection}>
        <h2>Sinopsis</h2>
        <p>{book.description}</p>
      </section>

      <section className={styles.reviews}>
        <h2>Reviews:</h2>
        {review.length === 0 ? (
          <p>No hay reviews aún.</p>
        ) : (
          review.map((r) => (
            <div key={r.id} className={styles.reviewCard}>
              <div className={styles.avatar}>
                <Image
                  src="/logos/usuario.png"
                  alt="avatar usuario"
                  width={40}
                  height={40}
                  className={styles.cover}
                />
              </div>
              <div className={styles.reviewContent}>
                <div className={styles.reviewHeader}>
                  <strong>{r.username}</strong>
                  <span>{'⭐'.repeat(r.rating)}</span>
                </div>
                <p>{r.comment}</p>
                <small>{r.reviewDate}</small>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
