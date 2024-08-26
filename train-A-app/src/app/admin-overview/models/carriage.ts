export interface Carriage {
  code: string;
  name: string;
  rows: number;
  leftSeats: number;
  rightSeats: number;
}

export interface CarriageDataForSchema {
  name: string;
  rows: string;
  leftSeats: string;
  rightSeats: string;
}
