import { Repository } from "typeorm";
import { Book } from "src/entities/book.entity";

export async function preloadBooks(bookRepository: Repository<Book>) {
    const booksToPreload = [
        {
            title: '1984',
            author: 'George Orwell',
            genre: 'ScFi',
            description: 'Una saga familiar en Macondo que abarca siete generaciones.',
            price: 19.99,
            stock: 50,
            exclusive: false,
        },
        {
            title: 'El Código Da Vinci',
            author: 'Dan Brown',
            genre: ['Thriller', 'Misterio', 'Ficción'],
            description: 'Un misterio que combina arte, religión y conspiraciones.',
            price: 15.99,
            stock: 30,
            exclusive: true,
        },
        {
            title: 'Harry Potter y la Piedra Filosofal',
            author: 'J.K. Rowling',
            genre: ['Fantasía', 'Juvenil', 'Aventura'],
            description: 'El inicio de las aventuras de Harry en Hogwarts.',
            price: 12.99,
            stock: 100,
            exclusive: false,
        },
        {
            title: '1984',
            author: 'Gabriel García Márquez',
            genre: 'Realismo Mágico',
            description: 'Una saga familiar en Macondo que abarca siete generaciones.',
            price: 19.99,
            stock: 50,
            exclusive: false,
        },
        {
            title: '1984',
            author: 'Gabriel García Márquez',
            genre: 'Realismo Mágico',
            description: 'Una saga familiar en Macondo que abarca siete generaciones.',
            price: 19.99,
            stock: 50,
            exclusive: false,
        },
        {
            title: '1984',
            author: 'Gabriel García Márquez',
            genre: 'Realismo Mágico',
            description: 'Una saga familiar en Macondo que abarca siete generaciones.',
            price: 19.99,
            stock: 50,
            exclusive: false,
        },
    ];

    for (const bookData of booksToPreload) {
        const existingBook = await bookRepository.findOne({ where: { title: bookData.title }});
        
    }
}