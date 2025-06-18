'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import NovedadesCarousel from './novedadesCarousel/novedades_carousel';
import {BookCardProps} from './bookCard/bookCardColumnInfo/book_card_column_info';
import Styles from './styles.module.css';
import BooksDisplayerFlex from './booksDisplayers/booksDisplayerFlex/books_displayer_flex';
import BooksDisplayerFlexGrid from './booksDisplayers/booksDisplayersFlexGrid/books_displayer_flexgrid';
import BooksScroller from './booksScroller/books_scroller';
import GenresBooks from './bookGenresSection/bookGenresSection';
import AuthorBooks from './authorBooksSection/author_books';

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
  const LibrosRecientementeAgregados:BookCardProps[] = [
    {title: 'Libro 1', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {title: 'Libro 2', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {title: 'Libro 3', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {title: 'Libro 4', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
  ];
  const LibrosRecomendadosAgregados:BookCardProps[] = [
    {title: 'Libro 1', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {title: 'Libro 2', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {title: 'Libro 3', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {title: 'Libro 4', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {title: 'Libro 5', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {title: 'Libro 6', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Configuración inicial - Etapa 1
      // gsap.set(bannerTextRef.current, { opacity: 0, y: 50 });
      // gsap.set([sliderRef.current, catalogoRef.current], { opacity: 0, y: 100 });

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
    <div className={Styles.pageContainer}>
      <NovedadesCarousel />
      <BooksDisplayerFlex title='Recientemente Agregados' books={LibrosRecientementeAgregados}/>
      <BooksDisplayerFlexGrid title='Recomendados' rows={2} books={LibrosRecomendadosAgregados}/>
      <GenresBooks />
      <AuthorBooks />
    </div>
  );
}