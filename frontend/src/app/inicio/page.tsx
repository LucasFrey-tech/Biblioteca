'use client'

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import NovedadesCarousel from './novedadesCarousel/novedades_carousel';
import Styles from './styles.module.css';
import BooksDisplayerFlexGrid from './booksDisplayers/booksDisplayersFlexGrid/books_displayer_flexgrid';
import GenresBooks from './bookGenresSection/bookGenresSection';
import AuthorBooks from './authorBooksSection/author_books';
import { BookRecommendationDTO } from '@/API/types/bookRecomendation.dto';
import { BaseApi } from '@/API/baseApi';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [booksRecomended, setBooksRecomended] = useState<BookRecommendationDTO[]>([]);

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
      <BooksDisplayerFlexGrid title='Recomendados' rows={2} books={booksRecomended}/>
      <GenresBooks />
      <AuthorBooks />
    </div>
  );
}