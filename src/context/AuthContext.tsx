import { createContext, useContext, useEffect, useState } from "react";
import { getMe, signin, logout as apiLogout, telegramLogin } from "@/api/auth";
import type { StudentItem } from "@/types/StudentItem";
import type { AuthContextType } from "@/types/AuthContextType";
import { getTelegramInitData } from "@/utils/getTelegramUserId";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<StudentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const initData = getTelegramInitData();
        if (initData) {
          try {
            const { student } = await telegramLogin(initData);
            console.log("Вход через Telegram успешен:", student);
            setUser(student);
            setIsAuthenticated(true);
            return;
          } catch (err) {
            console.error("Ошибка входа через Telegram:", err);
          }
        }
        const me = await getMe();
        setUser(me.student);
        setIsAuthenticated(true);
      } catch (err) {
        console.warn("Ошибка авторизации:", err);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (cardNumber: string, password: string) => {
    setError(null);
    try {
      await signin(cardNumber, password);
      const { student } = await getMe();
      setUser(student);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка входа");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("Ошибка при выходе:", err);
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  return context;
};
