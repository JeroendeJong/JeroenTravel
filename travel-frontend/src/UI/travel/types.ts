export interface Accommodation {
  name: string;
  review: string;
  address: string;
  place: string;
}

export interface TripDetail {
  id: string;
  location_type: string;
  location_text: string;
  name: string;
  short_description: string;
  long_description: string;
  arrival_time: any;
  departure_time: any;
  header_image_url: any;
  posted_time: string;
  accomodation: Accommodation;
  photos: TripSegmentPhotos[];
}

export interface TripSegmentPhotos {
  id: number,
  link_id: string,
  description: string,
  geom: GeoJSON.Point
}

export interface TripOverview {
  id: string;
  name: string;
  description: string;
  country_codes: string;
  header_image_url: string;
  active: boolean;
  extent: {coordinates: number[]};
  start_date: string;
  end_date: string;
}