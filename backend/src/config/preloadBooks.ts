import { Repository } from "typeorm";
import { Book } from "src/entities/book.entity";

export async function preloadBooks(bookRepository: Repository<Book>) {
    const booksToPreload = [
        {
            title: '1984',
            author: 'George Orwell',
            genre: ['Distopía', 'Ficción', 'Clásico'],
            description: 'Una novela sobre un futuro totalitario donde el Gran Hermano lo controla todo.',
            isbn: '978-0451524935',
            price: 19.199,
            stock: 50,
            exclusive: true,
        },
        {
            title: 'Asesino de Brujas - Los Hijos del Rey',
            author: 'Shelby Mahurin',
            genre: ['Fantasía', 'Juvenil', 'Romance'],
            description: 'Una joven bruja debe aliarse con un cazador para sobrevivir.',
            isbn: "978-0062878069",
            price: 29.000,
            stock: 30,
            exclusive: true,
        },
        {
            title: 'Ana Frank - Antes del Diario',
            author: 'Alice Hoffman',
            genre: ['Ficción Historica', 'Biografia', 'Juvenil'],
            description: 'El inicio de las aventuras de Ana Frank.',
            isbn: '978-1338302943',
            price: 10.299,
            stock: 100,
            exclusive: false,
        },
        {
            title: 'El Codigo Da Vinci',
            author: 'Dan Brown',
            genre: ['Thriller', 'Misterio', 'Ficcion'],
            description: 'Un misterio que combina arte, religion y conspiraciones.',
            isbn: '978-0307474278',
            price: 29.990,
            stock: 50,
            exclusive: false,
        },
        {
            title: 'Harry Potter y la Piedra Filosofal',
            author: 'J.K. Rowling',
            genre: ['Fantasía', 'Juvenil', 'Aventura'],
            description: 'El inicio de las aventuras de Harry en Hogwarts.',
            isbn: '978-0439708180',
            price: 24.000,
            stock: 100,
            exclusive: false,
        },
        {
            title: 'Infinity Blade',
            author: 'Brandon Sanderson',
            genre: ['Realismo Mágico'],
            description: 'Una saga familiar en Macondo que abarca siete generaciones.',
            isbn: "978-8466653619",
            price: 47.060,
            stock: 50,
            exclusive: false,
        },
    ];

    for (const bookData of booksToPreload) {
        
        const existingBook = await bookRepository.findOne({ where: { isbn: bookData.isbn } });
        if (!existingBook) {
            const book = bookRepository.create(bookData);
            await bookRepository.save(book);
            console.log(`Preloaded book: ${book.title} (ISBN: ${book.isbn})`);
        }
    }
}