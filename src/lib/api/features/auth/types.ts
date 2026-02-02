export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  expiresIn: number;
  user: {
    id: string;
    fullName: string;
    email: string;
    profile: string;
  };
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
}
