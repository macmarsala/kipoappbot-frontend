export function getTelegramUserId(): number | null {
  return window.Telegram?.WebApp?.initDataUnsafe?.user?.id || null;
}

export function getTelegramInitData(): string {
  return window.Telegram?.WebApp?.initData || "";
}
