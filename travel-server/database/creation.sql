create table airport (
	id serial primary key, 
	ident text, 
	type text, 
	name text, 
	latitude_deg float, 
	longitude_deg float, 
	elevation_ft integer, 
	continent text, 
	iso_country text, 
	iso_region text, 
	municipality text, 
	scheduled_service varchar, 
	gps_code varchar, 
	iata_code varchar, 
	local_code varchar, 
	home_link text, 
	wikipedia_link text, 
	keywords text
);

CREATE TABLE flight (
  id SERIAL PRIMARY KEY,
  airport_departure_link_id integer REFERENCES airport(id),
  airport_arrival_link_id integer REFERENCES airport(id),
  geom geometry,
  datetime_departure timestamp without time zone,
  datetime_arrival timestamp without time zone,
  operator_link_id integer REFERENCES flight_operator(id),
  code text
);

CREATE TABLE flight_operator (
    id SERIAL PRIMARY KEY,
    name text
);