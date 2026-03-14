export type UserLevel = "A2" | "B1" | "B2" | "C1";
export type Provider = "local" | "google";
export interface User {
  _id: string;
  nickname: string;
  email: string;
  level: UserLevel;
  provider: Provider;
}

export interface LoginResponseData {
  user: User;
  token: string;
}

export interface UserRequestData {
  nickname?: string;
  email?: string;
  level?: UserLevel;
  password?: string;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  isCheckingEmail: boolean;
  isInitialized: boolean;
  registrationError: string | null;
  loginError: string | null;
}
