import axios from "axios";
import { getTelegramInitData } from "@/utils/getTelegramUserId";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function signin(cardNumber: string, password: string) {
  const initData = getTelegramInitData();
  const response = await axios.post(
    `${API_BASE}/auth/signin`,
    { cardNumber, password, initData },
    { withCredentials: true }
  );
  return response.data;
}

export async function getMe() {
  const res = await axios.get(`${API_BASE}/auth/me`, {
    withCredentials: true,
  });
  return res.data;
}

export async function telegramLogin(initData: string) {
  const res = await axios.post(
    `${API_BASE}/auth/telegram/login`,
    { initData },
    { withCredentials: true }
  );
  return res.data;
}

export async function logout() {
  await axios.post(`${API_BASE}/auth/telegram/logout`, {}, {
    withCredentials: true,
  });
}
