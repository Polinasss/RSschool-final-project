export interface Order {
  id: number;
  rideId: number;
  routeId: number;
  userId: number;
  seatId: number;
  status: string;
  stationStart: number;
  stationEnd: number;
  carriages: string[];
  path: number[];
  schedule: Schedule;
}

export interface Schedule {
  segments: Segment[];
}

export interface Segment {
  time: string[];
  price: Price;
}

export interface Price {
  [key: string]: number;
}
