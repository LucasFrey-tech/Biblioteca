'use client'

import Styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card';
import BookCard from '@/components/pages/Bookcard';

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
      <div className={Styles.novedadesCarousel}>
        <Carousel
          opts={{
            align: "start",
            loop: true
          }}
          className="max-w"
          >
          <CarouselContent>
            {Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                <div className={Styles.novedadesBookCard}>
                  <img src={"https://hips.hearstapps.com/hmg-prod/images/gettyimages-180680638-676f621f720bc.jpg?crop=1.00xw:0.752xh;0,0.118xh&resize=1200:*"}/>
                  <div className={Styles.details}>
                    <div className={Styles.detailsTop}/>
                    <div className={Styles.detailsMid}>
                      <h2>PERROS: La ultima frontera?</h2>
                    </div>
                    <div className={Styles.detailsBot}>
                      <p>Un analisis instrospectivo sobre la dieta canina, y las consecuencia sobre la relaciones gatunas.</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/> 
          <CarouselNext /> 
        </Carousel>
      </div>
      <div className={Styles.newbooksContainer}>
        <div className={Styles.titelContainer}>
          <h1 className={Styles.title}>Nuevos Lanzamientos:</h1>
        </div>
        <div className={Styles.cardsContainer}>
          <div className={Styles.bookCardContainer}>
            <BookCard book={{id: 1, title: 'Libro 1', author: 'Autor 1', image: '/libros/libro1.webp',price: 3}} />
            <BookCard book={{id: 1, title: 'Libro 1', author: 'Autor 1', image: '/libros/libro1.webp',price: 3}} />
            <BookCard book={{id: 1, title: 'Libro 1', author: 'Autor 1', image: '/libros/libro1.webp',price: 3}} />
          </div>
        </div>
      </div>
      <div className={Styles.recomendationsContainer}>
        <div className={Styles.titelContainer}>
          <h1 className={Styles.title}>Recomendaciones:</h1>
        </div>
        <div className={Styles.cardsContainer}>
          <div className={Styles.bookCardContainer}>
            <BookCard book={{id: 1, title: 'Libro 1', author: 'Autor 1', image: '/libros/libro1.webp',price: 3}} />
            <BookCard book={{id: 1, title: 'Libro 1', author: 'Autor 1', image: '/libros/libro1.webp',price: 3}} />
            <BookCard book={{id: 1, title: 'Libro 1', author: 'Autor 1', image: '/libros/libro1.webp',price: 3}} />
          </div>
        </div>
          <div className={Styles.bookCardContainer}>
            <BookCard book={{id: 1, title: 'Libro 1', author: 'Autor 1', image: '/libros/libro1.webp',price: 3}} />
            <BookCard book={{id: 1, title: 'Libro 1', author: 'Autor 1', image: '/libros/libro1.webp',price: 3}} />
            <BookCard book={{id: 1, title: 'Libro 1', author: 'Autor 1', image: '/libros/libro1.webp',price: 3}} />
          </div>
      </div>
    </div>
  );
}