export interface Trip {
  routes: Route[];
  from?: From;
  to?: To;
}

export interface Route {
  path: number[];
  carriages: string[];
  id: number;
  schedule: Schedule[];
}

export interface Ride {
  path: number[];
  carriages: string[];
  rideId: number;
  schedule: Schedule[];
}

export interface Schedule {
  rideId: number;
  segments: Segment[];
}

export interface Segment {
  time: string[];
  price: Price;
  occupiedSeats: number[];
}

export interface Price {
  [carriage: string]: number;
}

export interface From {
  stationId: number;
  city: string;
  geolocation: Geolocation;
}

export interface To {
  stationId: number;
  city: string;
  geolocation: Geolocation;
}

export interface Geolocation {
  latitude: number;
  longitude: number;
}
