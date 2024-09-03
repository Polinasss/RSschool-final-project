import { Ride } from 'app/admin-overview/models/ride';

export type RideState = {
  ride: Ride | null;
  isLoading: boolean;
  error: string | null;
};

export const initialRideState: RideState = {
  ride: null,
  isLoading: false,
  error: null,
};
