import { Genre } from "./genre";

export interface BookLibreria {
  id: number;
  title: string;
  author: string;
  author_id: number;
  description: string;
  genre: Genre[];
  anio: number;
  image: string;
  subscriber_exclusive: boolean;
  idUser?: number;
  idBook?: number;
};