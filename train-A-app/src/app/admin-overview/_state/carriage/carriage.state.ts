import { Carriage } from '../../models/carriage';

export type CarriageState = {
  carriage: Carriage[];
  isLoading: boolean;
  error: string | null;
};

export const initialCarriageState: CarriageState = {
  carriage: [],
  isLoading: false,
  error: null,
};
