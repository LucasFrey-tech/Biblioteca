import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/6">
                  <BookCardWithWithinInfo title={"Title " + index} writer="pepe" img="https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}