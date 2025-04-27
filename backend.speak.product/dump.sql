--
-- PostgreSQL database dump
--

-- Dumped from database version 14.14 (Homebrew)
-- Dumped by pg_dump version 14.14 (Homebrew)

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
-- Name: courses; Type: TABLE; Schema: public; Owner: rajanyadav
--

CREATE TABLE public.courses (
    course_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    credits integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.courses OWNER TO rajanyadav;

--
-- Name: courses_course_id_seq; Type: SEQUENCE; Schema: public; Owner: rajanyadav
--

CREATE SEQUENCE public.courses_course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_course_id_seq OWNER TO rajanyadav;

--
-- Name: courses_course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rajanyadav
--

ALTER SEQUENCE public.courses_course_id_seq OWNED BY public.courses.course_id;


--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: rajanyadav
--

CREATE TABLE public.enrollments (
    enrollment_id integer NOT NULL,
    student_id integer,
    course_id integer,
    enrollment_date date DEFAULT CURRENT_DATE,
    grade character varying(10),
    status character varying(50),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.enrollments OWNER TO rajanyadav;

--
-- Name: enrollments_enrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: rajanyadav
--

CREATE SEQUENCE public.enrollments_enrollment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.enrollments_enrollment_id_seq OWNER TO rajanyadav;

--
-- Name: enrollments_enrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rajanyadav
--

ALTER SEQUENCE public.enrollments_enrollment_id_seq OWNED BY public.enrollments.enrollment_id;


--
-- Name: parents; Type: TABLE; Schema: public; Owner: rajanyadav
--

CREATE TABLE public.parents (
    parent_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255),
    phone character varying(50),
    address text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.parents OWNER TO rajanyadav;

--
-- Name: parents_parent_id_seq; Type: SEQUENCE; Schema: public; Owner: rajanyadav
--

CREATE SEQUENCE public.parents_parent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parents_parent_id_seq OWNER TO rajanyadav;

--
-- Name: parents_parent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rajanyadav
--

ALTER SEQUENCE public.parents_parent_id_seq OWNED BY public.parents.parent_id;


--
-- Name: schools; Type: TABLE; Schema: public; Owner: rajanyadav
--

CREATE TABLE public.schools (
    school_id integer NOT NULL,
    name character varying(255) NOT NULL,
    address text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.schools OWNER TO rajanyadav;

--
-- Name: schools_school_id_seq; Type: SEQUENCE; Schema: public; Owner: rajanyadav
--

CREATE SEQUENCE public.schools_school_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schools_school_id_seq OWNER TO rajanyadav;

--
-- Name: schools_school_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rajanyadav
--

ALTER SEQUENCE public.schools_school_id_seq OWNED BY public.schools.school_id;


--
-- Name: student_parent; Type: TABLE; Schema: public; Owner: rajanyadav
--

CREATE TABLE public.student_parent (
    student_id integer NOT NULL,
    parent_id integer NOT NULL,
    relationship_type character varying(100),
    is_primary_contact boolean DEFAULT false
);


ALTER TABLE public.student_parent OWNER TO rajanyadav;

--
-- Name: students; Type: TABLE; Schema: public; Owner: rajanyadav
--

CREATE TABLE public.students (
    student_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    date_of_birth date,
    gender character varying(50),
    email character varying(255),
    phone character varying(50),
    address text,
    school_id integer,
    grade_level character varying(50),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.students OWNER TO rajanyadav;

--
-- Name: students_student_id_seq; Type: SEQUENCE; Schema: public; Owner: rajanyadav
--

CREATE SEQUENCE public.students_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_student_id_seq OWNER TO rajanyadav;

--
-- Name: students_student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rajanyadav
--

ALTER SEQUENCE public.students_student_id_seq OWNED BY public.students.student_id;


--
-- Name: courses course_id; Type: DEFAULT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.courses ALTER COLUMN course_id SET DEFAULT nextval('public.courses_course_id_seq'::regclass);


--
-- Name: enrollments enrollment_id; Type: DEFAULT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.enrollments ALTER COLUMN enrollment_id SET DEFAULT nextval('public.enrollments_enrollment_id_seq'::regclass);


--
-- Name: parents parent_id; Type: DEFAULT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.parents ALTER COLUMN parent_id SET DEFAULT nextval('public.parents_parent_id_seq'::regclass);


--
-- Name: schools school_id; Type: DEFAULT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.schools ALTER COLUMN school_id SET DEFAULT nextval('public.schools_school_id_seq'::regclass);


--
-- Name: students student_id; Type: DEFAULT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.students ALTER COLUMN student_id SET DEFAULT nextval('public.students_student_id_seq'::regclass);


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: rajanyadav
--

COPY public.courses (course_id, name, description, credits, created_at, updated_at) FROM stdin;
1	Introduction to Algebra	Basic algebra concepts	3	2025-04-24 23:25:53.365968+05:30	2025-04-24 23:25:53.365968+05:30
2	World History	Survey of world civilizations	4	2025-04-24 23:25:53.365968+05:30	2025-04-24 23:25:53.365968+05:30
3	English Literature	Study of classic literature	3	2025-04-24 23:25:53.365968+05:30	2025-04-24 23:25:53.365968+05:30
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: rajanyadav
--

COPY public.enrollments (enrollment_id, student_id, course_id, enrollment_date, grade, status, created_at, updated_at) FROM stdin;
1	1	1	2025-04-24	\N	enrolled	2025-04-24 23:26:46.59205+05:30	2025-04-24 23:26:46.59205+05:30
2	1	2	2025-04-24	\N	enrolled	2025-04-24 23:26:46.59205+05:30	2025-04-24 23:26:46.59205+05:30
3	2	1	2025-04-24	A	completed	2025-04-24 23:26:46.59205+05:30	2025-04-24 23:26:46.59205+05:30
4	2	3	2025-04-24	\N	enrolled	2025-04-24 23:26:46.59205+05:30	2025-04-24 23:26:46.59205+05:30
5	3	1	2025-04-24	\N	enrolled	2025-04-24 23:26:46.59205+05:30	2025-04-24 23:26:46.59205+05:30
6	3	2	2025-04-24	\N	enrolled	2025-04-24 23:26:46.59205+05:30	2025-04-24 23:26:46.59205+05:30
\.


--
-- Data for Name: parents; Type: TABLE DATA; Schema: public; Owner: rajanyadav
--

COPY public.parents (parent_id, first_name, last_name, email, phone, address, created_at, updated_at) FROM stdin;
1	Homer	Simpson	homer.simpson@example.com	555-1234	\N	2025-04-24 23:26:02.499274+05:30	2025-04-24 23:26:02.499274+05:30
2	Marge	Simpson	marge.simpson@example.com	555-5678	\N	2025-04-24 23:26:02.499274+05:30	2025-04-24 23:26:02.499274+05:30
3	Ned	Flanders	ned.flanders@example.com	555-9012	\N	2025-04-24 23:26:02.499274+05:30	2025-04-24 23:26:02.499274+05:30
\.


--
-- Data for Name: schools; Type: TABLE DATA; Schema: public; Owner: rajanyadav
--

COPY public.schools (school_id, name, address, created_at, updated_at) FROM stdin;
1	Springfield High School	123 Main St, Springfield	2025-04-24 23:25:44.591443+05:30	2025-04-24 23:25:44.591443+05:30
2	Shelbyville Elementary	456 Oak Ave, Shelbyville	2025-04-24 23:25:44.591443+05:30	2025-04-24 23:25:44.591443+05:30
\.


--
-- Data for Name: student_parent; Type: TABLE DATA; Schema: public; Owner: rajanyadav
--

COPY public.student_parent (student_id, parent_id, relationship_type, is_primary_contact) FROM stdin;
1	1	Father	f
1	2	Mother	t
2	1	Father	f
2	2	Mother	t
3	3	Father	t
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: rajanyadav
--

COPY public.students (student_id, first_name, last_name, date_of_birth, gender, email, phone, address, school_id, grade_level, created_at, updated_at) FROM stdin;
1	Bart	Simpson	2005-02-20	Male	bart.simpson@example.com	555-1111	742 Evergreen Terrace	1	10th Grade	2025-04-24 23:26:14.076023+05:30	2025-04-24 23:26:14.076023+05:30
2	Lisa	Simpson	2007-05-09	Female	lisa.simpson@example.com	555-2222	742 Evergreen Terrace	1	8th Grade	2025-04-24 23:26:14.076023+05:30	2025-04-24 23:26:14.076023+05:30
3	Milhouse	Van Houten	2006-07-01	Male	milhouse.vanhouten@example.com	555-3333	Adjacent to 742 Evergreen Terrace	1	10th Grade	2025-04-24 23:26:14.076023+05:30	2025-04-24 23:26:14.076023+05:30
\.


--
-- Name: courses_course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rajanyadav
--

SELECT pg_catalog.setval('public.courses_course_id_seq', 3, true);


--
-- Name: enrollments_enrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rajanyadav
--

SELECT pg_catalog.setval('public.enrollments_enrollment_id_seq', 6, true);


--
-- Name: parents_parent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rajanyadav
--

SELECT pg_catalog.setval('public.parents_parent_id_seq', 3, true);


--
-- Name: schools_school_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rajanyadav
--

SELECT pg_catalog.setval('public.schools_school_id_seq', 2, true);


--
-- Name: students_student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rajanyadav
--

SELECT pg_catalog.setval('public.students_student_id_seq', 3, true);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (course_id);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (enrollment_id);


--
-- Name: enrollments enrollments_student_id_course_id_key; Type: CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_course_id_key UNIQUE (student_id, course_id);


--
-- Name: parents parents_email_key; Type: CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.parents
    ADD CONSTRAINT parents_email_key UNIQUE (email);


--
-- Name: parents parents_pkey; Type: CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.parents
    ADD CONSTRAINT parents_pkey PRIMARY KEY (parent_id);


--
-- Name: schools schools_pkey; Type: CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.schools
    ADD CONSTRAINT schools_pkey PRIMARY KEY (school_id);


--
-- Name: student_parent student_parent_pkey; Type: CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.student_parent
    ADD CONSTRAINT student_parent_pkey PRIMARY KEY (student_id, parent_id);


--
-- Name: students students_email_key; Type: CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_email_key UNIQUE (email);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);


--
-- Name: enrollments enrollments_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- Name: enrollments enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id) ON DELETE CASCADE;


--
-- Name: student_parent student_parent_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.student_parent
    ADD CONSTRAINT student_parent_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.parents(parent_id) ON DELETE CASCADE;


--
-- Name: student_parent student_parent_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.student_parent
    ADD CONSTRAINT student_parent_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id) ON DELETE CASCADE;


--
-- Name: students students_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rajanyadav
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(school_id);


--
-- PostgreSQL database dump complete
--

