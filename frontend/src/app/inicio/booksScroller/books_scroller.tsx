import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Styles from './styles.module.css';
import BookCardWithWithinInfo, { BookCardProps } from "../bookCard/bookCardWithinInfo/book_card_within_info";

interface BooksScrollerProps {
    title: string;
    books: BookCardProps[];
}

export default function BooksScroller({ title, books }:BooksScrollerProps): React.JSX.Element {
  return (
    <div className={Styles.books_scroller}>
      <div className={Styles.title}>
        <h3>{title}</h3>
        <hr></hr>
      </div>
      <div className={Styles.content}>
        <div className={Styles.content_carousel}>
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
            className="max-w"
          >
            <CarouselContent>
              {books.map((book, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/6">
                  <BookCardWithWithinInfo bookId={book.bookId} title={book.title} writer={book.writer} img={book.img} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}