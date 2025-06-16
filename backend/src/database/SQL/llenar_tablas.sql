
-- AÑADIR DATOS DE PRUEBA A USERS
insert into users(username,email,password) values ('pepito','pepito@gmail.com','1234');
insert into users(username,email,password) values ('armando','armando@gmail.com','1234');
insert into users(username,email,password) values ('paredes','paredes@gmail.com','1234');
insert into users(username,email,password,admin) values ('adm','adm@gmail.com','adm',true);


-- AÑADIR DATOS DE PRUEBA A GENRES
insert into genres(name) values ('Aventura'); --1
insert into genres(name) values ('Acción'); --2
insert into genres(name) values ('Misterio'); --3
insert into genres(name) values ('Ciencia Ficción'); --4
insert into genres(name) values ('Fantasía'); --5
insert into genres(name) values ('Historico'); --6
insert into genres(name) values ('Romance'); --7

-- AÑADIR DATOS DE PRUEBA A AUTHOR
insert into authors(name) values ('George Orwell'); --1
insert into authors(name) values ('Dan Brown'); --2
insert into authors(name) values ('J.K. Rowling'); --3
insert into authors(name) values ('Juan Polaco'); --4
insert into authors(name) values ('Alice Hoffman'); --5
insert into authors(name) values ('Brandon Sanderson'); --6
insert into authors(name) values ('Shelby Mahurin'); --7

-- AÑADIR DATOS DE PRUEBA A BOOK_GENRES
insert into book_genres (id_book,id_genre) values (1,1);
insert into book_genres (id_book,id_genre) values (1,2);
insert into book_genres (id_book,id_genre) values (2,3);
insert into book_genres (id_book,id_genre) values (3,1);
insert into book_genres (id_book,id_genre) values (3,3);

-- AÑADIR DATOS DE PRUEBA A REVIEWS
insert into reviews(id_user,id_book,rating,comment) values (
	1,
	1,
	5,
	'Muy bueno.'
);

insert into reviews(id_user,id_book,rating,comment) values (
	1,
	1,
	1,
	'Muy Malo.'
);

insert into reviews(id_user,id_book,rating,comment) values (
	2,
	2,
	1,
	'No lo leí, es muy malo.'
);

insert into reviews(id_user,id_book,rating,comment) values (
	3,
	3,
	5,
	'Efectivamente, es Literatura.'
);
