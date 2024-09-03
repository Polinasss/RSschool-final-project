import { User } from 'app/orders/models/user';

export type UserState = {
  user: User[];
  error: string | null;
};

export const initialUserState: UserState = {
  user: [],
  error: null,
};
