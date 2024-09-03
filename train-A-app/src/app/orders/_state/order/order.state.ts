import { Order } from '../../models/order';

export type OrderState = {
  order: Order[];
  isLoading: boolean;
  error: string | null;
};

export const initialOrderState: OrderState = {
  order: [],
  isLoading: false,
  error: null,
};
