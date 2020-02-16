-- DDL generated by Postico 1.5.10
-- Not all database features are supported. Do not use for backup.

-- Table Definition ----------------------------------------------

CREATE TABLE accommodation (
    id SERIAL PRIMARY KEY,
    name text,
    address text,
    geom geometry,
    review text,
    booking_link text,
    place text
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX accommodation_pkey ON accommodation(id int4_ops);