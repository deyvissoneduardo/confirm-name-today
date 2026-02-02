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
