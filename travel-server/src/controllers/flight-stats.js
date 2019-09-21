const { Client } = require('pg');
const client = new Client();

const baseDBQuery = async (sql, mutator) => {
  const response = await client
    .query(sql)
    .catch(e => console.error(e.stack));

  if (mutator) return mutator(response.rows);
  return response.rows;
}

const flightCountSQL = `
  select count(*)::integer from flight
`;

const totalFlightDistance = `
  with flight_gometries as (
    select 
      (select geom from airport where id = airport_departure_link_id) as start_geom,
      (select geom from airport where id = airport_arrival_link_id) as end_geom
    from flight
  ) 

  select SUM(distance)::integer from (
    select ST_Distance(
      start_geom::geography,
      end_geom::geography
    )::integer / 1000 as distance
    from flight_gometries
  ) as a;
`;

const mostCommonAirportSQL = `
  select 
    count(*)::integer, 
    (select name from airport where airport_link_id = id ) 
  from (
    select airport_departure_link_id as airport_link_id from flight
    union all
    select airport_arrival_link_id as airport_link_id from flight
  ) as airports 
  group by airport_link_id
  order by count desc;
`;

const mostCommonFlightCodeSQL = `
  select count(*)::integer, code from flight group by code order by count desc
`;

const mostCommonFlightOperatorSQL = `
  select count(*)::integer, name from (
    select (select name from flight_operator where id = operator_link_id) from flight
  ) as output 
  group by name
  order by count desc;
`;

const get = async () => {
  client.connect();
  const returnVal = {
    totalFlightCount: await baseDBQuery(flightCountSQL, rows => rows[0].count),
    totalflightDistance: await baseDBQuery(totalFlightDistance, rows => rows[0].sum),
    airportUseCount: await baseDBQuery(mostCommonAirportSQL),
    flightCodeUseCount: await baseDBQuery(mostCommonFlightCodeSQL),
    operatorUseCount: await baseDBQuery(mostCommonFlightOperatorSQL)
  };

  client.end();

  return returnVal;
}



module.exports = get;