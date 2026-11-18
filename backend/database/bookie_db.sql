create database bookie_db;
use bookie_db;
-- users
create table users (
id int auto_increment primary key,
username varchar(100) not null,
email varchar(150) not null unique,
password varchar(255) not null,
create_at timestamp default current_timestamp
);
alter table users
change create_at created_at timestamp default current_timestamp;
-- categories
create table categories(
id int auto_increment primary key,
category_name varchar(100) not null unique
);

-- books
create table books (
id int auto_increment primary key,
user_id int not null,
title varchar(255) not null,
author varchar(150) not null,
category varchar(100),
description text,
cover_imgage varchar(500),
created_at timestamp default current_timestamp,

constraint fk_books_users 
	foreign key (user_id)
    references users(id)
    on delete cascade
);
alter table books
change cover_imgage cover_image varchar(500);

DESCRIBE books;
-- book categories
create table book_categories (
book_id int not null,
category_id int not null,
primary key (book_id, category_id),

foreign key (book_id)
	references books(id)
	on delete cascade,

foreign key (category_id)
	references categories(id)
	on delete cascade
);

-- borrowing
create table borrowings (
id int auto_increment primary key ,
user_id int not null,
book_id int not null,
borrow_date date not null,
due_date date not null,
return_date date,
status enum('borrowed', 'returned','overdue') default 'borrowed',

foreign key (user_id)
	references users(id)
    on delete cascade,
foreign key (book_id)
	references books(id)
    on delete cascade
);

-- favorite 
create table favorites (
id int auto_increment primary key,
user_id int not null,
book_id int not null,
created_at timestamp default current_timestamp,

unique (user_id, book_id),

foreign key (user_id)
	references users(id)
    on delete cascade,
    
foreign key (book_id)
	references books(id)
    on delete cascade
);

-- reviews 
create table reviews (
id int auto_increment primary key,
user_id int not null,
book_id int not null,
rating int not null check (rating between 1 and 5),
comment text,
created_at timestamp default current_timestamp,

unique (user_id, book_id),

foreign key (user_id)
	references users(id)
    on delete cascade,
    
foreign key (book_id)
	references books(id)
    on delete cascade
);

-- setting 
create table settings (
id int auto_increment primary key,
user_id int not null unique,
theme enum('light', 'dark') default 'light',
language varchar(20) default 'en',
notifications boolean default true,

foreign key (user_id)
	references users(id)
    on delete cascade
);

-- insert users 
insert into users (username, email, password)
values (
    'admin',
    'admin@bookie.com',
    'temporary_demo_password'
);

-- insert catgories
insert into categories (category_name)
values
('Programming'),
('Fiction'),
('Fantasy'),
('Self-Help'),
('Business'),
('Science'),
('Education');

-- insert books
insert into books
(user_id, title, author, description, cover_image)
values
(
    (select id from users where email = 'admin@bookie.com'),
    'Clean Code',
    'Robert C. Martin',
    'A guide to writing clean and maintainable code.',
    'images/clean-code.jpg'
),
(
    (select id from users where email = 'admin@bookie.com'),
    'Atomic Habits',
    'James Clear',
    'A guide to building better habits.',
    'images/atomic-habits.jpg'
),
(
    (select id from users where email = 'admin@bookie.com'),
    'The Alchemist',
    'Paulo Coelho',
    'A story about following your dreams.',
    'images/alchemist.jpg'
);

-- connect books with categories
insert into book_categories (book_id, category_id)
values
(
    (select id from books where title = 'Clean Code'),
    (select id from categories where category_name = 'Programming')
),
(
    (select id from books where title = 'Atomic Habits'),
    (select id from categories where category_name = 'Self-Help')
),
(
    (select id from books where title = 'The Alchemist'),
    (select id from categories where category_name = 'Fiction')
);

-- insert borrowing
insert into borrowings
(user_id, book_id, borrow_date, due_date, status)
values
(
    (select id from users where email = 'admin@bookie.com'),
    (select id from books where title = 'Clean Code'),
    curdate(),
    date_add(curdate(), interval 14 day),
    'borrowed'
);

-- insert favorite
insert into favorites (user_id, book_id)
values (
    (select id from users
     where email = 'admin@bookie.com'),

    (select id from books
     where title = 'Atomic Habits')
);

-- insert review 
insert into review (user_id, book_id, rating, comment)
values
(
	(select id from users where	email = 'admin@bookie.com'),
    (select id from books where title = 'Clean Code'),
    5,
    'Very useful book for programing students.'
);

-- insert setting 
insert into settings
(user_id, theme, language, notifications)
values
(
    (select id from users where email = 'admin@bookie.com'),
    'light',
    'en',
    true
);

SELECT
    b.id,
    b.title,
    b.author,
    c.category_name
FROM books b
JOIN book_categories bc ON b.id = bc.book_id
JOIN categories c ON bc.category_id = c.id;