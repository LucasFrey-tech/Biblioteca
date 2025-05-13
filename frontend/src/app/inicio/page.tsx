'use client'

import Link from 'next/link';
import Image from "next/image"
import styles from '../../styles/home.module.css'
import { useRouter } from 'next/navigation';


export default function HomePage() {

  const router = useRouter();

  // Libros slider iniciales
  const sliderBooks = [
    { id: 1, image: '/libros/libro1.webp' },
    { id: 2, image: '/libros/libro2.webp' },
    { id: 3, image: '/libros/libro3.webp' },
  ];

  // Libros catálogo debajo
  const catalogoBooks = [
    { id: 1, title: 'Libro 1', price: 19.99, image: '/libros/libro1.webp' },
    { id: 2, title: 'Libro 2', price: 24.99, image: '/libros/libro2.webp' },
    { id: 3, title: 'Libro 3', price: 29.99, image: '/libros/libro3.webp' },
  ];

  return (
    <div className={styles.container}>
      {/* Banner central */}
      <section className={styles.banner}>
        <div className={styles.bannerImageWrapper}>
          <Image
            // src="/images/banner1.webp"
            src="/images/banner2.webp"
            alt="banner"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className={styles.bannerText}>
          <h2>Mi Biblioteca</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui fugiat, facilis corporis laboriosam exercitationem quod, ducimus, numquam illo molestiae dicta et aspernatur quisquam! Deleniti ex earum numquam ratione, voluptate alias.</p>
        </div>
      </section>

      {/* Slider */}
      <section className={styles.slider}>
        {sliderBooks.map((book) => (
          <div key={book.id} className={styles.slide} onClick={() => router.push(`/catalogo/${book.id}`)}>
            <Image src={book.image} alt={`Libro ${book.id}`} width={200} height={300} />
          </div>
        ))}
      </section>

      {/* Catálogo */}
      <section className={styles.catalogo}>
        {catalogoBooks.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <Image src={book.image} alt={book.title} width={150} height={200} />
            <h3>{book.title}</h3>
            <p>${book.price}</p>
          </div>
        ))}
      </section>

    </div>
  );

}


// <input className={styles.searchBar} type="text" placeholder="Buscar libros..."/>
// <div className={styles.icons}>
//   <Link href="/login">
//     <Image src="/logos/usuario.png" alt="Usuario" width={30} height={30} />
//   </Link>
//   <Image src="/logos/carrito.png" alt="Carrito" width={30} height={30} />
// </div>