CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY(id)
)

INSERT INTO employee VALUES
    (1, 'Joe', 1000),
    (2, 'Henry', 2000),
    (3, 'Sam', 3000),
    (4, 'Max', 4000);

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    email VARCHAR(45) DEFAULT NULL UNIQUE,
    password VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY(id)
)