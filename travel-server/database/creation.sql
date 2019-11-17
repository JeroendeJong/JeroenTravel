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
  code text,
  status text
);

CREATE TABLE flight_operator (
  id SERIAL PRIMARY KEY,
  name text
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  name text,
  description text,
  country_codes text,
  header_image_url text,
  active boolean,
  extent geometry
);

CREATE TABLE trip_segment (
  id SERIAL PRIMARY KEY,
  trip_id integer REFERENCES trips(id),
  type text,
  name text,
  long_description text,
  arrival_time timestamp with time zone,
  departure_time timestamp with time zone,
  header_image_url text,
  short_description text,
  accommodation_id integer REFERENCES accommodation(id),
  posted_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trip_segment_geometry (
  id SERIAL PRIMARY KEY,
  geom geometry,
  type text,
  trip_segment_id integer REFERENCES trip_segment(id)
);

CREATE TABLE accommodation (
  id SERIAL PRIMARY KEY,
  name text,
  address text,
  geom geometry,
  review text,
  booking_link text,
  place text
);