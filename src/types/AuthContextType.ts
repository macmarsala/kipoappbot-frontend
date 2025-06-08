import type { StudentItem } from "@/types/StudentItem";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: StudentItem | null;
  loading: boolean;
  error: string | null;
  login: (cardNumber: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
