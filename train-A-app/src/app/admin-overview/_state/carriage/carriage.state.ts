import { Carriage } from '../../models/carriage';

export type CarriageState = {
  carriage: Carriage[];
  isLoading: boolean;
  error: string;
};

export const initialCarriageState: CarriageState = {
  carriage: [],
  isLoading: false,
  error: '',
};
