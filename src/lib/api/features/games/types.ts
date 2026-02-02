export interface Game {
  id: string;
  gameDate: string;
  released: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Confirmation {
  id: string;
  gameId: string;
  userId: string;
  confirmedName: string;
  isGuest: boolean;
  confirmedByUserId: string | null;
  confirmedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConfirmationRequest {
  confirmedName: string;
  isGuest?: boolean;
}
