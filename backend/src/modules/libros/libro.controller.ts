import { Request, Response } from "express";
import Book from "./libro.model";
import Autor from '../autor/autor.model';

interface BookGetAll{
  author: string;
  limit: string;
  offset: string;
}

interface BookParams {
  id: string;
}

export const getAllBooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log('getAllBooks');
    console.log(`Query: ${JSON.stringify(req.query)}`);
    console.log(`Params: ${JSON.stringify(req.params)}`);
    console.log("-----------------------------------");
    const queryString: BookGetAll = req.query as unknown as BookGetAll;
    let params = undefined;
    if (queryString.author === "true") {
      params = {
                include: [
                { model: Autor }
            ],
            offset: Number(queryString.offset),
            limit: Number(queryString.limit)
        };
    }
    const books = await Book.findAll(params);
    return res.status(200).json({ success: true, data: books});
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los libros',
            error: (error as Error).message
        });
    }
};


export const getBookById = async (req: Request<BookParams>, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id, {
            include: [{ model: Autor }]
        });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        return res.status(200).json({ success: true, data: book });
    } catch (error) {
        console.error('Error al obtener el libro:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el libro',
            error: (error as Error).message
        });
    }
};

export const createBook = async (req: Request, res: Response): Promise<Response> => {
    try {
        const bookData = req.body;
        const newBook = await Book.create(bookData);

        return res.status(201).json({
            success: true,
            message: 'Libro creado exitosamente',
            data: newBook
        });
    } catch (error) {
        console.error('Error al crear el libro:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear el libro',
            error: (error as Error).message
        });
    }
};

export const updateBook = async (req: Request<BookParams>, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const bookData = req.body;

        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        await book.update(bookData);
        return res.status(200).json({
            success: true,
            message: 'Libro actualizado exitosamente',
            data: book
        });
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el libro',
            error: (error as Error).message
        });
    }
};

export const deleteBook = async (req: Request<BookParams>, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        await book.destroy();
        return res.status(200).json({
            success: true,
            message: 'Libro eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el libro',
            error: (error as Error).message
        });
    }
};