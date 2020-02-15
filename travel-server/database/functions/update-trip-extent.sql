CREATE OR REPLACE FUNCTION update_trip_extent(trip_id INTEGER) RETURNS void AS $$
BEGIN

RAISE DEBUG 'Updating Extent For TripID: (%)', trip_id;

EXECUTE format('
	UPDATE trips
	SET extent = (
		select ST_extent(geom) from (
			select geom from trip_segment as ts
			join trip_segment_geometry as tsg on ts.id = tsg.trip_segment_id
			where trip_id = $1
			
			union all
			
			select geom from trip_segment as ts
			join trip_segment_photos as tsp on ts.id = tsp.trip_segment_id
			where trip_id = $1
		) as a
	)
	WHERE
	   trips.id = $1;
') using trip_id;
END
$$language plpgsql;
