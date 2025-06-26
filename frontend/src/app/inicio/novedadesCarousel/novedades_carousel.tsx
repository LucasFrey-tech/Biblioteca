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
import Image from "next/image";

export default function NovedadesCarousel(): React.JSX.Element {
  const [carouselItems, setCarouselItems] = useState<CarouselItemDTO[]>([]);
  const router = useRouter();
  const apiRef = useRef(new BaseApi());

  useEffect(() => {
    async function getCarouselItems() {
      const carouselItems = await apiRef.current.carousel.getAll();
      setCarouselItems(carouselItems);
    }
    getCarouselItems()
  }, []);

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
          {/* Banner fijo como primer elemento */}
          <CarouselItem key="banner" className="md:basis-1/1 lg:basis-1/1">
            <div className={Styles.novedadesBookCard}>
              <Image
                src="/images/bannerLibroNovedad.png"
                alt="Novedades literarias"
                width={650}
                height={350}
                className="w-full h-auto object-contain"
              />
            </div>
          </CarouselItem>

          {/* Items dinámicos del carrusel */}
          {carouselItems.length === 0 ? (
            <CarouselItem key={0} className="md:basis-1/1 lg:basis-1/1">
              <div className={Styles.novedadesBookCard}>
                <Image
                  src="/images/carousel_placeholder.jpg"
                  alt="Placeholder"
                  width={600}
                  height={350}
                  className="w-full h-auto object-cover"
                />
              </div>
            </CarouselItem>
          ) : (
            carouselItems.map((ci, index) => (
              <CarouselItem 
                key={index} 
                className="md:basis-1/1 lg:basis-1/1" 
                onClick={() => router.push(`/book/${ci.idBook}`)}
              >
                <div className={Styles.novedadesBookCard}>
                  <Image
                    src={
                      typeof ci.image === "string" && ci.image.trim() !== ""
                        ? ci.image
                        : "/images/carousel_placeholder.jpg"
                    }
                    alt={`Libro ${ci.idBook}`}
                    width={300}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}