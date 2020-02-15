
CREATE TRIGGER trigger_extent_update
AFTER INSERT ON trip_segment_geometry
FOR EACH ROW
EXECUTE PROCEDURE trigger_extent_update();


-- Listens for additions in the geometry table. 
-- This will then get the trip_id asociated with the geometry, and call the update_trip_extent function.
CREATE OR REPLACE FUNCTION trigger_extent_update() RETURNS TRIGGER AS
$BODY$
BEGIN
	perform update_trip_extent(trip_id) from trip_segment as ts
	join trip_segment_geometry as tsg on ts.id = tsg.trip_segment_id
	where tsg.trip_segment_id = NEW.trip_segment_id
	limit 1;
	
	-- we don't want to alter the geometry coming in.
	RETURN NEW;
END;
$BODY$
language plpgsql;





