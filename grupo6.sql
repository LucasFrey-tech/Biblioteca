--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-05 16:41:13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16446)
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id_book integer NOT NULL,
    title character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    genre character varying(100) NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    stock integer NOT NULL,
    exclusive boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.books OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16445)
-- Name: books_id_book_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.books_id_book_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_id_book_seq OWNER TO postgres;

--
-- TOC entry 4838 (class 0 OID 0)
-- Dependencies: 221
-- Name: books_id_book_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_id_book_seq OWNED BY public.books.id_book;


--
-- TOC entry 218 (class 1259 OID 16422)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16421)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 4839 (class 0 OID 0)
-- Dependencies: 217
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 224 (class 1259 OID 16458)
-- Name: shopping_cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping_cart (
    id_cart integer NOT NULL,
    creation_date timestamp without time zone DEFAULT now() NOT NULL,
    id_user integer NOT NULL,
    id_book integer NOT NULL
);


ALTER TABLE public.shopping_cart OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16457)
-- Name: shopping_cart_id_cart_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shopping_cart_id_cart_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shopping_cart_id_cart_seq OWNER TO postgres;

--
-- TOC entry 4840 (class 0 OID 0)
-- Dependencies: 223
-- Name: shopping_cart_id_cart_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shopping_cart_id_cart_seq OWNED BY public.shopping_cart.id_cart;


--
-- TOC entry 220 (class 1259 OID 16431)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    registration_date timestamp without time zone DEFAULT now() NOT NULL,
    plan character varying(50) DEFAULT 'free'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16430)
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_user_seq OWNER TO postgres;

--
-- TOC entry 4841 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- TOC entry 4662 (class 2604 OID 16449)
-- Name: books id_book; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN id_book SET DEFAULT nextval('public.books_id_book_seq'::regclass);


--
-- TOC entry 4656 (class 2604 OID 16425)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 4666 (class 2604 OID 16461)
-- Name: shopping_cart id_cart; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart ALTER COLUMN id_cart SET DEFAULT nextval('public.shopping_cart_id_cart_seq'::regclass);


--
-- TOC entry 4657 (class 2604 OID 16434)
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- TOC entry 4830 (class 0 OID 16446)
-- Dependencies: 222
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (id_book, title, author, genre, description, price, stock, exclusive, created_at, updated_at) FROM stdin;
1	Cien Años de Soledad	Gabriel García Márquez	Realismo Mágico	Una saga familiar en Macondo.	19.99	50	f	2025-05-04 12:57:00.010447	2025-05-04 12:57:00.010447
2	1984	George Orwell	SCFI Fantasia	Una saga familiar en Macondo.	35	50	f	2025-05-04 17:00:40.940808	2025-05-04 17:00:40.940808
3	1984	George Orwell	SCFI Fantasia	Una saga familiar en Macondo.	35000	50	f	2025-05-04 17:01:11.601589	2025-05-04 17:01:11.601589
\.


--
-- TOC entry 4826 (class 0 OID 16422)
-- Dependencies: 218
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1746373272773	InitialMigration1746373272773
\.


--
-- TOC entry 4832 (class 0 OID 16458)
-- Dependencies: 224
-- Data for Name: shopping_cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shopping_cart (id_cart, creation_date, id_user, id_book) FROM stdin;
\.


--
-- TOC entry 4828 (class 0 OID 16431)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, name, password, email, role, registration_date, plan, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4842 (class 0 OID 0)
-- Dependencies: 221
-- Name: books_id_book_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_book_seq', 3, true);


--
-- TOC entry 4843 (class 0 OID 0)
-- Dependencies: 217
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- TOC entry 4844 (class 0 OID 0)
-- Dependencies: 223
-- Name: shopping_cart_id_cart_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shopping_cart_id_cart_seq', 1, false);


--
-- TOC entry 4845 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 1, false);


--
-- TOC entry 4675 (class 2606 OID 16456)
-- Name: books PK_8065cbf94f3902bef4d65fcaf67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT "PK_8065cbf94f3902bef4d65fcaf67" PRIMARY KEY (id_book);


--
-- TOC entry 4669 (class 2606 OID 16429)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 4677 (class 2606 OID 16464)
-- Name: shopping_cart PK_d9a8440a158a37dfa2617cf9f5b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT "PK_d9a8440a158a37dfa2617cf9f5b" PRIMARY KEY (id_cart);


--
-- TOC entry 4671 (class 2606 OID 16442)
-- Name: users PK_fbb07fa6fbd1d74bee9782fb945; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY (id_user);


--
-- TOC entry 4673 (class 2606 OID 16444)
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- TOC entry 4678 (class 2606 OID 16470)
-- Name: shopping_cart FK_345ebb8e7cc995f1d0daef2a7b7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT "FK_345ebb8e7cc995f1d0daef2a7b7" FOREIGN KEY (id_book) REFERENCES public.books(id_book);


--
-- TOC entry 4679 (class 2606 OID 16465)
-- Name: shopping_cart FK_c5c803654dbab6f0d71c588b11b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT "FK_c5c803654dbab6f0d71c588b11b" FOREIGN KEY (id_user) REFERENCES public.users(id_user);


-- Completed on 2025-05-05 16:41:14

--
-- PostgreSQL database dump complete
--

