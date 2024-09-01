export interface Ride {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}
export interface Schedule {
  rideId: number;
  segments: Segment[];
}

export interface Segment {
  time: Time;
  price: Price;
}

export interface Time {
  time: [string, string];
}

export interface Price {
  [key: string]: number;
}

export interface RideResponse {
  id: number;
}
