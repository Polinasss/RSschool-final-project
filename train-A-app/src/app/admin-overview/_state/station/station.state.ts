import { Station } from 'app/admin-overview/models/station';

export type StationState = {
  station: Station[];
  isLoading: boolean;
  error: string | null;
};

export const initialStationState: StationState = {
  station: [],
  isLoading: false,
  error: null,
};
