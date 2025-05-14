'use client'

import Image from 'next/image';
import styles from '../../styles/inicio.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const router = useRouter();
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerTextRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLElement>(null);
  const catalogoRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Configuración inicial - Etapa 1
      gsap.set(bannerTextRef.current, { opacity: 0, y: 50 });
      gsap.set([sliderRef.current, catalogoRef.current], { opacity: 0, y: 100 });

      // Animación del banner completo
      const bannerAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Etapa 2 - Aparece el texto
      bannerAnimation.to(bannerTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, 0.5);

      // Animaciones para el slider y catálogo
      ScrollTrigger.create({
        trigger: sliderRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
        onEnter: () => {
          gsap.to(sliderRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
          });
        }
      });

      ScrollTrigger.create({
        trigger: catalogoRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
        onEnter: () => {
          gsap.to(catalogoRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Banner central */}
      <section className={styles.banner} ref={bannerRef}>
        <div className={styles.bannerImageWrapper}>
          <Image
            src="/images/banner1.webp"
            alt="banner"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className={styles.bannerText} ref={bannerTextRef}>
          <h2>Mi Biblioteca</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui fugiat, facilis corporis laboriosam exercitationem quod, ducimus, numquam illo molestiae dicta et aspernatur quisquam! Deleniti ex earum numquam ratione, voluptate alias.</p>
        </div>
      </section>

      {/* Slider */}
      <section className={styles.slider} ref={sliderRef}>
        {sliderBooks.map((book) => (
          <div key={book.id} className={styles.slide} onClick={() => router.push(`/catalogo/${book.id}`)}>
            <Image src={book.image} alt={`Libro ${book.id}`} width={200} height={300} />
          </div>
        ))}
      </section>

      {/* Catálogo */}
      <section className={styles.catalogo} ref={catalogoRef}>
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