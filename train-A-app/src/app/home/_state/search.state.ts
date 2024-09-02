import { Trip } from '../models/trip';

export type TripState = {
  trip: Trip;
  isLoading: boolean;
  error: string | null;
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
