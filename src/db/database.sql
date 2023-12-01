CREATE DATABASE eventregulation;

<-- use the database with \c eventregulation -->

CREATE EXTENSION  "pgcrypto";

CREATE TABLE product (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);


CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    coins INTEGER NOT NULL,
    location VARCHAR(255) NOT NULL,
    participants UUID[] DEFAULT array[]::uuid[] 
);

CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255) DEFAULT 'user',
    coins INTEGER DEFAULT 0,
    avatar VARCHAR(255) DEFAULT '',
    bought_products UUID[] DEFAULT array[]::uuid[] ,
    events UUID[] DEFAULT array[]::uuid[]
);

CREATE type order_status as enum ('pending', 'done');

CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    product_id UUID,
    status order_status DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);

-- This is a join for the orders table

SELECT
    o.id AS order_id,
    CONCAT(u.name, ' ', u.surname) AS user_full_name,
    p.name AS product_name,
    o.status AS order_status
FROM
    orders o
JOIN
    users u ON o.user_id = u.id
JOIN
    product p ON o.product_id = p.id;


-- To identify the user that has earned coins in exact event

CREATE TABLE earned_coins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    event_id UUID,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (event_id) REFERENCES events (id)
);