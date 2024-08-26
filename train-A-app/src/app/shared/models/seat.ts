export interface Seat {
  seatNumber: number;
  position: 'left' | 'right';
  isAvailable: boolean;
  selected: boolean;
}
