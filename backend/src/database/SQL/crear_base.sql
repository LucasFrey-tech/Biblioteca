
-- CREAR BASE DE DATOS
create database alejandria

-- CREAR TABLA USERS
create table users (
	id serial primary key,
	username varchar(100) not null,
	firstname varchar(100) not null,
	lastname varchar(100) not null,
	email varchar(100) not null unique,
	password varchar(100) not null,
	tel varchar(20) default(''),
	admin bool default(false),
	disabled bool default(false),
	registration_date timestamp default(CURRENT_TIMESTAMP)
);

-- CREAR TABLA BOOKS
create table books (
	id serial primary key,
	title varchar(100) not null,
	author_id INTEGER NOT NULL,
	description text not null,
	anio INTEGER,
	isbn varchar(20) unique,
    image text default(''),
	stock integer not null check(stock >= 0),
	subscriber_exclusive boolean default(false),
	price float not null check(price >= 0)
);

-- CREAR TABLA GENRES
create table genres(
	id serial primary key,
	name varchar(100)
);

-- CREAR TABLA BOOK_GENRES
create table book_genres(
	id serial primary key,
	id_genre integer not null,
	id_book integer not null
);

-- CREAR TABLA AUTHOR
CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

-- CREAR TABLA VIRTUAL_BOOK_CONTENT
create table virtual_book_content(
	id serial primary key,
	id_book integer not null,
	content text not null
);

-- CREAR TABLA USER_VIRTUAL_BOOKS
create table user_virtual_books(
	id serial primary key,
	id_user integer not null,
	id_book integer not null
);

-- CREAR TABLA REVIEWS
create table reviews (
	id serial primary key,
	id_user integer not null,
	id_book integer not null,
	rating smallint not null,
	comment varchar(1000) not null,
	review_date timestamp default(CURRENT_TIMESTAMP)
);

-- CREAR TABLA USER_SUBSCRIPTION -- no se
create table user_subscription(
	id serial primary key,
	id_user integer not null,
	start_date timestamp not null,
	end_date timestamp not null,
	ongoing boolean default(false)
);

-- CREAR TABLA SUBSCRIPTION_BOOK_DISCOUNT -- no se
create table subscription_book_discount(
	id serial primary key,
	id_book integer not null,
	discount float not null default(0) check(discount >= 0)
);

-- CREAR TABLA SHOPPING_CART_BOOK
create table shopping_cart_book(
	id serial primary key,
	id_user integer not null,
	id_book integer not null,
	amount integer not null check(amount >= 0),
	virtual bool default(false)
);

-- CREAR TABLA Purchases
create table purchases(
	id serial primary key,
	id_user integer not null,
	id_book integer not null,
	amount integer not null check(amount >= 0),
	price integer not null check(price >= 0),
	virtual bool default(false),
	purchase_date timestamp default(CURRENT_TIMESTAMP)
);
