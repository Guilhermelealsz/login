CREATE DATABASE login;

USE login;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE,
    celular VARCHAR(20),
    data_nascimento DATE
);
