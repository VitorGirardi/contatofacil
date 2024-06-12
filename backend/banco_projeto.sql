CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  birthdate DATE,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  favorite BOOLEAN NOT NULL DEFAULT FALSE
);


select * from users


drop table users
delete from users
where username = 'lucasl'