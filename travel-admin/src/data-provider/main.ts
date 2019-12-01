import TravelDataProvider from "./trip/trip-singleton"
import TripSegmentDataProvider from './trip-segment/trip-segment-singleton';

const Provider = (resource: any, type: any, input: any) => {
  console.log(resource, type, input)
  if (type === 'trip') {
    return (TravelDataProvider as any)[resource](type, input);
  }

  if (type === 'trip-segment') {
    return (TripSegmentDataProvider as any)[resource](type, input);
  }
}

export default Provider;