import { UserProfile } from '../models/user-profile';

export type UserProfileState = {
  user: UserProfile;
  error: string | null;
};

export const initialUserProfile: UserProfileState = {
  user: { name: '', email: '', role: '' },
  error: null,
};
