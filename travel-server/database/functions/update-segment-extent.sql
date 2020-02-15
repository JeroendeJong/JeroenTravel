CREATE OR REPLACE FUNCTION update_segment_extent(segment_id INTEGER) RETURNS void AS $$
BEGIN

RAISE DEBUG 'Updating Extent For SegmentID: (%)', segment_id;

EXECUTE format('
	UPDATE trip_segment
	SET extent = (
		select ST_extent(geom) from (
			select geom from trip_segment_geometry as ts
			where trip_segment_id = $1
			
			union all
			
			select geom from trip_segment_photos as ts
			where trip_segment_id = $1
		) as a
	)
	WHERE
	   trip_segment.id = $1;
') using segment_id;
END
$$language plpgsql;