const { Client } = require('pg');

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
    (select name from airport where airport_link_id = id ) as value
  from (
    select airport_departure_link_id as airport_link_id from flight
    union all
    select airport_arrival_link_id as airport_link_id from flight
  ) as airports 
  group by airport_link_id
  order by count desc;
`;

const mostCommonFlightCodeSQL = `
  select count(*)::integer, code as value from flight group by code order by count desc
`;

const mostCommonFlightOperatorSQL = `
  select count(*)::integer, name as value from (
    select (select name from flight_operator where id = operator_link_id) from flight
  ) as output 
  group by name
  order by count desc;
`;

const client = new Client();
client.connect();

const get = async () => {

  const formattedStats = [
    {
      id: 'TOTAL_FLIGHT_COUNT',
      name: 'Total flights taken',
      description: 'The total number of flights taken',
      data: await baseDBQuery(flightCountSQL, rows => rows[0].count)
    },
    {
      id: 'TOTAL_FLIGHT_DISTANCE',
      name: 'Total distance flown',
      description: 'The total distance covered on all flights. In Kilometres',
      data: await baseDBQuery(totalFlightDistance, rows => rows[0].sum + ' Kilometres')
    },
    {
      id: 'USE_COUNT_AIRPORTS',
      name: 'Most popular airport(s)',
      description: 'The airports most often used for departure or arrival of a flight',
      data: await baseDBQuery(mostCommonAirportSQL)
    },
    {
      id: 'USE_COUNT_FLIGHT',
      name: 'Most popular flight(s)',
      description: 'The specific flights most travelled on',
      data: await baseDBQuery(mostCommonFlightCodeSQL)
    },
    {
      id: 'USE_COUNT_FLIGHT_OPERATOR',
      name: 'Most popular flight operator(s)',
      description: 'The flight operator most often used',
      data: await baseDBQuery(mostCommonFlightOperatorSQL)
    }
  ];

  return formattedStats;
}



module.exports = get;