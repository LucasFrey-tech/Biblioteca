'use client';

import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Styles from './styles.module.css';
import { CarouselItemDTO } from "@/API/types/carousel.dto";
import { useRouter } from 'next/navigation';
import { BaseApi } from "@/API/baseApi";
import carousel_placeholder_img from "@/../public/images/carousel_placeholder.jpg"

export default function NovedadesCarousel(): React.JSX.Element {
  const [imagePlaceholder] = useState(carousel_placeholder_img);
  const [carouselItems, setCarouselItems] = useState<CarouselItemDTO[]>([]);

  const router = useRouter();
  const apiRef = useRef(new BaseApi());

  useEffect(() => {
    async function getCarouselItems() {
      const carouselItems = await apiRef.current.carousel.getAll();
      console.log(carouselItems)
      setCarouselItems(carouselItems);
    }
    getCarouselItems()
  }, []);

  return (
    <div className={Styles.novedadesCarousel}>
      <Carousel
        opts={{
          align: "start",
          loop: false
        }}
        className="max-w"
      >
        <CarouselContent>
          {
            carouselItems.length <= 0 ?
              <>
                <CarouselItem key={1} className="md:basis-1/1 lg:basis-1/1">
                  <div className={Styles.novedadesBookCard}>
                    <img src={imagePlaceholder.src} />
                  </div>
                </CarouselItem>
              </> :
              carouselItems.map((ci, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1" onClick={() => router.push(`/book/${ci.id}`)}>
                  <div className={Styles.novedadesBookCard}>
                    <img src={ci.image} />
                  </div>
                </CarouselItem>
              ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}