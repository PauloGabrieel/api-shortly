--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: sessions; Type: TABLE; Schema: public; Owner: mmfjrbjaknfqyj
--

CREATE TABLE "public"."sessions" (
    "id" integer NOT NULL,
    "userId" integer NOT NULL,
    "token" "text" NOT NULL,
    "createAt" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE public.sessions OWNER TO mmfjrbjaknfqyj;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: mmfjrbjaknfqyj
--

CREATE SEQUENCE "public"."sessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO mmfjrbjaknfqyj;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER SEQUENCE "public"."sessions_id_seq" OWNED BY "public"."sessions"."id";


--
-- Name: urls; Type: TABLE; Schema: public; Owner: mmfjrbjaknfqyj
--

CREATE TABLE "public"."urls" (
    "id" integer NOT NULL,
    "url" "text" NOT NULL,
    "shortUrl" "text" NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createAt" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE public.urls OWNER TO mmfjrbjaknfqyj;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: mmfjrbjaknfqyj
--

CREATE SEQUENCE "public"."urls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO mmfjrbjaknfqyj;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER SEQUENCE "public"."urls_id_seq" OWNED BY "public"."urls"."id";


--
-- Name: users; Type: TABLE; Schema: public; Owner: mmfjrbjaknfqyj
--

CREATE TABLE "public"."users" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "password" "text" NOT NULL,
    "createAt" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE public.users OWNER TO mmfjrbjaknfqyj;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: mmfjrbjaknfqyj
--

CREATE SEQUENCE "public"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO mmfjrbjaknfqyj;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER TABLE ONLY "public"."sessions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."sessions_id_seq"'::"regclass");


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER TABLE ONLY "public"."urls" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."urls_id_seq"'::"regclass");


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: mmfjrbjaknfqyj
--

COPY "public"."sessions" ("id", "userId", "token", "createAt") FROM stdin;
\.


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: mmfjrbjaknfqyj
--

COPY "public"."urls" ("id", "url", "shortUrl", "visitCount", "userId", "createAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mmfjrbjaknfqyj
--

COPY "public"."users" ("id", "name", "email", "password", "createAt") FROM stdin;
\.


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mmfjrbjaknfqyj
--

SELECT pg_catalog.setval('"public"."sessions_id_seq"', 1, false);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mmfjrbjaknfqyj
--

SELECT pg_catalog.setval('"public"."urls_id_seq"', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mmfjrbjaknfqyj
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 2, true);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_pk" PRIMARY KEY ("id");


--
-- Name: urls urls_pk; Type: CONSTRAINT; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_pk" PRIMARY KEY ("id");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pk" PRIMARY KEY ("id");


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "public"."users"("id");


--
-- Name: urls urls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: mmfjrbjaknfqyj
--

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_fk0" FOREIGN KEY ("userId") REFERENCES "public"."users"("id");


--
-- PostgreSQL database dump complete
--

