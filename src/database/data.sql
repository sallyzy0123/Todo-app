CREATE DATABASE todoapp;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    title VARCHAR(30),
    progress INT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);

INSERT INTO todos(user_id, title, progress) VALUES('1', 'First todo', 10);
