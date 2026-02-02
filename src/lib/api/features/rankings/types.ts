export type RankingType =
  | 'goals'
  | 'complaints'
  | 'victories'
  | 'draws'
  | 'defeats'
  | 'minutes-played';

export interface RankingItem {
  position: number;
  userId: string;
  userName: string;
  userEmail: string;
  value: number;
  formattedValue: string;
}

export interface RankingResponse {
  type: RankingType;
  description: string;
  items: RankingItem[];
  total: number;
}
