export interface Order {
  id: number;
  rideId: number;
  routeId: number;
  seatId: number;
  userId: number;
  status: string;
  path: number[];
  carriages: string[];
  schedule: Schedule;
}

export interface Schedule {
  segments: Segment[];
}

export interface Segment {
  time: [string, string];
  price: Price;
}

export interface Price {
  [key: string]: number;
}
