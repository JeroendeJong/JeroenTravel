
-- Aiports CSV file from http://ourairports.com/data/
COPY airport FROM '/airports.csv' DELIMITER ',' CSV HEADER;
alter table airport add column geom geometry;
update airport set geom = ST_SetSRID(ST_Point(longitude_deg, latitude_deg),4326);

alter table airport drop column longitude_deg;
alter table airport drop column latitude_deg;
