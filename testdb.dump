--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    brand_id integer NOT NULL,
    name character varying(250),
    description character varying(1000)
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- Name: brands_brand_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brands_brand_id_seq OWNER TO postgres;

--
-- Name: brands_brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_brand_id_seq OWNED BY public.brands.brand_id;


--
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    email character varying(250),
    first_name character varying(250),
    last_name character varying(250),
    street character varying(250),
    municipality character varying(250),
    province character varying(250),
    zipcode character varying(250)
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_customer_id_seq OWNER TO postgres;

--
-- Name: customer_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;


--
-- Name: customer_favorite_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer_favorite_products (
    id integer NOT NULL,
    customer_id integer,
    product_id integer
);


ALTER TABLE public.customer_favorite_products OWNER TO postgres;

--
-- Name: customer_favorite_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_favorite_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_favorite_products_id_seq OWNER TO postgres;

--
-- Name: customer_favorite_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customer_favorite_products_id_seq OWNED BY public.customer_favorite_products.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    orders_id integer NOT NULL,
    customer_id integer,
    product_id integer,
    order_date timestamp without time zone,
    quantity integer
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_orders_id_seq OWNER TO postgres;

--
-- Name: orders_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_orders_id_seq OWNED BY public.orders.orders_id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    name character varying(250),
    description character varying(1000),
    tagline character varying(1000),
    price real,
    warranty integer,
    category_id integer,
    brand_id integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_category (
    category_id integer NOT NULL,
    name character varying(250)
);


ALTER TABLE public.products_category OWNER TO postgres;

--
-- Name: products_category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_category_category_id_seq OWNER TO postgres;

--
-- Name: products_category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_category_category_id_seq OWNED BY public.products_category.category_id;


--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_product_id_seq OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- Name: brands brand_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN brand_id SET DEFAULT nextval('public.brands_brand_id_seq'::regclass);


--
-- Name: customer customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);


--
-- Name: customer_favorite_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_favorite_products ALTER COLUMN id SET DEFAULT nextval('public.customer_favorite_products_id_seq'::regclass);


--
-- Name: orders orders_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN orders_id SET DEFAULT nextval('public.orders_orders_id_seq'::regclass);


--
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- Name: products_category category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_category ALTER COLUMN category_id SET DEFAULT nextval('public.products_category_category_id_seq'::regclass);


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (brand_id, name, description) FROM stdin;
3	Samsung	Samsung Brand
4	ASUS	ASUS Brand
5	Lenovo	Lenovo Brand
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (customer_id, email, first_name, last_name, street, municipality, province, zipcode) FROM stdin;
\.


--
-- Data for Name: customer_favorite_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer_favorite_products (id, customer_id, product_id) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (orders_id, customer_id, product_id, order_date, quantity) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, name, description, tagline, price, warranty, category_id, brand_id) FROM stdin;
2	Samsung Galaxy J1 2016 8GB (Gold)	4.5-inch Super AMOLED (480 x 800) display,1.3GHz Exynos 3475 quad-core CPU Mali-T720 GPU,1GB RAM and 8GB internal storage,up to 128GB via microSD,5MP AF rear camera w/ LED flash,2MP front camera	Samsung Galaxy J1	4790	120	2	3
3	SAMSUNG GALAXY J2 PRO 5.0 qHD Super AMOLED (Blue)	Processor : Quad-Core 1.4GHz Snapdragon Qualcomm, Camera Main: 8MP (F2.2), Camera Front: 5MP (F2.2) w/ LED Flash, Android Nougat 7.0, Internal Storage : 16GB ROM + 1.5GB RAM Memory,Battery : 2,600mAh,Gorilla Glass 4	SAMSUNG GALAXY J2 PRO	5990	120	2	3
4	Asus ZenFone Live 16GB ZB501KL	Body Dimensions 141.2 x 71.7 x 8 mm ,Weight 120 g (4.23 oz) ,SIM Hybrid Dual SIM ,Display Type PS LCD capacitive touchscreen, 16M colors ,Size 5.0 inches, 68.9 cm2 (~68.1% screen-to-body ratio) ,Resolution 720 x 1280 pixels, 16:9 ratio (~294 ppi density) ,Platform OS Android 6.0 (Marshmallow) ,Chipset Qualcomm MSM8916 Snapdragon 410 ,CPU Quad-core 1.2 GHz Cortex-A53 ,GPU Adreno 306 ,Memory Card slot microSD, up to 256 GB (uses SIM 2 slot) ,Internal 16GB, 2 GB RAM ,Camera Primary 13 MP, f/2.0, autofocus, LED flash ,Features Geo-tagging, touch focus, face detection, panorama ,Video 1080p@30fps ,Secondary 5 MP (f/2.2, 1.4 µm), autofocus, LED falsh ,Bluetooth 4.0, A2DP ,GPS Yes, with A-GPS, GLONASS ,Radio FM radio Yes ,Battery Non-removable Li-Ion 2650 mAh battery	Asus ZenFone	5995	120	2	4
5	Lenovo IdeaPad 120S-11IAP	Processor: Intel Celeron N3350 Processor 1.10 GHz (2M Cache, up to 2.4 GHz) ,Operating System: Windows 10 Home ,Graphics: Intel Integrated Graphics ,Memory: 2G LPDDR4 2400 ONBOARD ,Storage: 500G 7MM 5400RPM ,Audio: 2 x 1 W Speakers ,Battery: 2 Cell Battery ,Display: 11.6 HD TN AG (SLIM) ,WiFi/BT: 802.11 A.C 1x1 + BT 4.0  ,Ports: 2 x USB 3.0, 1 Type-C 3.0, HDMI, micro SD card reader, always-on charging	Lenovo IdeaPad 120S-11IAP	15990	120	3	5
\.


--
-- Data for Name: products_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_category (category_id, name) FROM stdin;
2	Mobiles
3	Laptops
\.


--
-- Name: brands_brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_brand_id_seq', 5, true);


--
-- Name: customer_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_customer_id_seq', 1, false);


--
-- Name: customer_favorite_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_favorite_products_id_seq', 1, false);


--
-- Name: orders_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_orders_id_seq', 1, false);


--
-- Name: products_category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_category_category_id_seq', 3, true);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_product_id_seq', 5, true);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (brand_id);


--
-- Name: customer_favorite_products customer_favorite_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_favorite_products
    ADD CONSTRAINT customer_favorite_products_pkey PRIMARY KEY (id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (orders_id);


--
-- Name: products_category products_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_category
    ADD CONSTRAINT products_category_pkey PRIMARY KEY (category_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: customer_favorite_products customer_favorite_products_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_favorite_products
    ADD CONSTRAINT customer_favorite_products_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- Name: customer_favorite_products customer_favorite_products_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_favorite_products
    ADD CONSTRAINT customer_favorite_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- Name: orders orders_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: products products_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(brand_id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.products_category(category_id);


--
-- PostgreSQL database dump complete
--

