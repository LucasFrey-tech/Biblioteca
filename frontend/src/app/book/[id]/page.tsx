'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Book } from '../../../../../backend/src/entidades/book.entity';
// import { Author } from '../../../../../backend/src/entidades/author.entity';
// import { Review } from '../../../../../backend/src/entidades/author.entity';

import styles from '../../../styles/BookDetail.module.css';

type Author = {
    id: number;
    name: string;
};

// type Book = {
//     id_book: number;
//     title: string;
//     author_id: number;
//     price: number;
//     synopsis?: string;
// };

// type Comment = {
//     id: number;
//     user: string;
//     comment: string;
//     rating: number;
// };

export default function BookDetail() {
    const params = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [author, setAuthor] = useState<Author>({id:0, name:''});
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // let author = new Author ;
    
    useEffect(() => {
        if (!params || !params.id) {
            setError('ID del libro no proporcionado.');
            setLoading(false);
            return;
        }

        const bookId = Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id);

        if (isNaN(bookId)) {
            setError('ID del libro inválido.');
            setLoading(false);
            return;
        }
        

        const fetchData = async () => {
            try {
                const resBook = await fetch(`http://localhost:3001/books/${bookId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const dataBook = await resBook.json();

                if (!resBook.ok) throw new Error('Libro no encontrado');

                const resAuthor = await fetch(`http://localhost:3001/authors/${dataBook.author_id}`);
                setAuthor(await resAuthor.json());
                // console.log(authors)

                // const resComments = await fetch(`/api/comments?bookId=${bookId}`);
                // const dataComments = await resComments.json();

                setBook(dataBook);
                // setAuthor(dataAuthor); - BORRAR
                // setComments(dataComments);
            } catch (err: any) {
                setError(err.message || 'Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;
    console.log(book)
    if (!book) return <p>Libro no encontrado!!!</p>;

    // console.log(author.find((a) => a.id == book.author_id));
    console.log(author)

    return (
        <div className={styles.container}>
            <div className={styles.bookDetail}>
                <div className={styles.coverContainer}>
                    <img
                        src={`/libros/book_${book.id}.png`}
                        alt={book.title}
                        width={300}
                        height={450}
                        onError={(e) => e.currentTarget.src = '/libros/placeholder.png'}
                    />
                </div>

                <div className={styles.infoContainer}>
                    <h1>{book.title}</h1>
                    <p><strong>Autor:</strong> {author.name}</p>
                    <p><strong>Precio:</strong> {new Intl.NumberFormat('es-AR', {
                        style: 'currency',
                        currency: 'ARS'
                    }).format(book.price)}</p>
                </div>
            </div>

            <section className={styles.synopsis}>
                <h2>Sinopsis</h2>
                {/* <p>{book.synopsis || 'Sin sinopsis disponible.'}</p> */}
            </section>
{/*  
            <section className={styles.comments}>
                <h2>Comentarios</h2>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className={styles.commentCard}>
                            <p><strong>{comment.user}</strong></p>
                            <p>{comment.comment}</p>
                            <p><em>Calificación: {comment.rating}/5</em></p>
                        </div>
                    ))
                ) : (
                    <p>No hay comentarios aún.</p>
                )}
            </section>
           
*/}

        </div>
    );
}
