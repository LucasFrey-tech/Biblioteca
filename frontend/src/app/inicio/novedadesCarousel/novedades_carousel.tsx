import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Styles from './styles.module.css';


export default function NovedadesCarousel(): React.JSX.Element {

    return (
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
    )
}