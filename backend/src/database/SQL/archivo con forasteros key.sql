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

-- CREAR TABLA AUTHOR
CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

-- CREAR TABLA BOOKS
create table books (
	id serial primary key,
	title varchar(100) not null,
	author_id INTEGER NOT NULL REFERENCES authors(id),
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
	id_genre INTEGER NOT NULL REFERENCES genres(id),
	id_book INTEGER NOT NULL REFERENCES books(id)
);



-- CREAR TABLA VIRTUAL_BOOK_CONTENT
create table virtual_book_content(
	id serial primary key,
	id_book INTEGER NOT NULL REFERENCES books(id),
	content text not null
);

-- CREAR TABLA USER_VIRTUAL_BOOKS
create table user_virtual_books(
	id serial primary key,
	id_user integer not null references users(id),
	id_book INTEGER NOT NULL REFERENCES books(id)
);

-- CREAR TABLA REVIEWS
create table reviews (
	id serial primary key,
	id_user integer not null references users(id),
	id_book INTEGER NOT NULL REFERENCES books(id),
	rating smallint not null,
	comment varchar(1000) not null,
	review_date timestamp default(CURRENT_TIMESTAMP)
);

-- CREAR TABLA SHOPPING_CART_BOOK
create table shopping_cart_book(
	id serial primary key,
	id_user integer not null references users(id),
	id_book INTEGER NOT NULL REFERENCES books(id),
	amount integer not null check(amount >= 0),
	virtual bool default(false)
);

-- CREAR TABLA Purchases
create table purchases(
	id serial primary key,
	id_user integer not null references users(id),
	id_book INTEGER NOT NULL REFERENCES books(id),
	amount integer not null check(amount >= 0),
	price float not null check(price >= 0),
	virtual bool default(false),
	purchase_date timestamp default(CURRENT_TIMESTAMP)
);

-- CREAR TABLA carousel
create table carousel(
	id serial primary key,
	image text default(''),
	book_id INTEGER NOT NULL REFERENCES books(id)
);

-- CREAR TABLA book_recommendations
create table book_recommendations(
	id serial primary key,
	book_id INTEGER NOT NULL REFERENCES books(id)
);

-- CREAR TABLA user_subscription
CREATE TABLE user_subscription (
    id serial PRIMARY KEY,
    id_user INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    id_subscription INTEGER NOT NULL REFERENCES subscription_price(id) ON DELETE CASCADE,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    ongoing BOOLEAN DEFAULT(false)
);

-- CREAR TABLA subscription_price
CREATE TABLE subscription_price (
  id serial PRIMARY KEY,
  price float NOT NULL
);