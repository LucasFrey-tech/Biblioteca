'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import NovedadesCarousel from './novedadesCarousel/novedades_carousel';
import {BookCardProps} from './bookCard/bookCardColumnInfo/book_card_column_info';
import Styles from './styles.module.css';
import BooksDisplayerFlex from './booksDisplayers/booksDisplayerFlex/books_displayer_flex';
import BooksDisplayerFlexGrid from './booksDisplayers/booksDisplayersFlexGrid/books_displayer_flexgrid';
import GenresBooks from './bookGenresSection/bookGenresSection';
import AuthorBooks from './authorBooksSection/author_books';
import { BookRecommendationDTO } from '@/API/types/bookRecomendation.dto';
import { BaseApi } from '@/API/baseApi';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerTextRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLElement>(null);
  const catalogoRef = useRef<HTMLElement>(null);

    const [booksRecomended, setBooksRecomended] = useState<BookRecommendationDTO[]>([]);

  // Libros catálogo debajo
  const LibrosRecientementeAgregados:BookCardProps[] = [
    {id: 1,title: 'Libro 1', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {id: 2,title: 'Libro 2', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {id: 3,title: 'Libro 3', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
    {id: 4,title: 'Libro 4', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
  ];

   const apiRef = useRef(new BaseApi());
  
      useEffect(() => {
          async function getBookRecomendations() {
              const res = await apiRef.current.bookRecomendations.getAll();
              setBooksRecomended(res)
          }
          getBookRecomendations()
      }, []);

  return (
    <div className={Styles.pageContainer}>
      <NovedadesCarousel />
      <BooksDisplayerFlex title='Recientemente Agregados' books={LibrosRecientementeAgregados}/>
      <BooksDisplayerFlexGrid title='Recomendados' rows={2} books={booksRecomended}/>
      <GenresBooks />
      <AuthorBooks />
    </div>
  );
}