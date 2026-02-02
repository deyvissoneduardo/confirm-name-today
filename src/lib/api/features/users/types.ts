export interface User {
  id: string;
  fullName: string;
  email: string;
  photo: string | null;
  profile: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  profile: string;
  photo?: string;
}

export interface UpdateUserRequest {
  fullName?: string;
  email?: string;
  password?: string;
  photo?: string;
}

export interface UserStatistics {
  id: string;
  userId: string;
  minutesPlayed: string; // HH:mm:ss format
  goals: number;
  complaints: number;
  victories: number;
  draws: number;
  defeats: number;
  createdAt: string;
  updatedAt: string;
}
