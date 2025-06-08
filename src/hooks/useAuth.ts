// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { getMe, logout as apiLogout, signin as apiSignin } from "@/api/auth";
import type { StudentItem } from "@/types/StudentItem";

export const useAuth = () => {
  const [user, setUser] = useState<StudentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Загружаем данные текущего пользователя
    getMe()
      .then((data) => {
        setUser(data.student);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (cardNumber: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { student } = await apiSignin(cardNumber, password);
      setUser(student);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Ошибка входа. Попробуйте снова.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("Ошибка при выходе:", err);
    }
    setUser(null);
  };

  return {
    isAuthenticated: !!user,
    user,
    loading,
    error,
    login,
    logout,
  };
};
