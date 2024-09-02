export interface UserProfile {
  name: string;
  email: string;
  role: string;
}

export interface UserProfileBody {
  name?: string;
  email?: string;
}

export interface UserProfilePasswordBody {
  password: string;
}
