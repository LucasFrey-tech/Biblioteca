export interface BookLibreria {
  id: number;
  title: string;
  author: string;
  author_id: number;
  description: string;
  genre: string[];
  anio: number;
  image: string;
  subscriber_exclusive: boolean;
  idUser?: number;  // Añadido
  idBook?: number;  // Añadido
};