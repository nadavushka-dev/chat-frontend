export type User = {
  username?: string;
  email?: string;
  id?: number;
};

export interface UserState {
  jwt?: string | null;
  isLoading: boolean;
  user: User;
}
