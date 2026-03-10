export type UserLevel = "A2" | "B1" | "B2" | "C1";
export interface User {
  id: string;
  nickname: string;
  email: string;
  level: UserLevel;
}

export interface LoginResponseData {
  user: User;
  token: string;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  registrationError: string | null;
  loginError: string | null;
}
