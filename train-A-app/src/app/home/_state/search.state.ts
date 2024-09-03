import { ChosenRide, Trip } from '../models/trip';

export type TripState = {
  trip: Trip;
  isLoading: boolean;
  error: string | null;
};
export type RideState = {
  ride: ChosenRide;
};

export const initialTripState: TripState = {
  trip: {
    routes: [],
    from: undefined,
    to: undefined,
  },
  isLoading: false,
  error: null,
};

export const initialRideState: RideState = {
  ride: {
    routeId: 0,
    fromCity: '',
    toCity: '',
    date: undefined,
    stations: [],
    carriages: [
      {
        type: '',
        price: 0,
        seats: 0,
      },
    ],
    occupiedSeats: [],
    schedule: [],
  },
};
