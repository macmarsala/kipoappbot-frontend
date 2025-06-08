### 📁 Frontend для Личного кабинета студента

# Личный кабинет студента — Frontend (Telegram WebApp)

Этот репозиторий содержит клиентскую часть дипломного проекта — мобильного личного кабинета студента для АНПОО «Кубанский ИПО», реализованного как Telegram Mini App.

## 🔧 Основные технологии

- **React** + **TypeScript**
- **Vite** для сборки
- **Tailwind CSS v4** для адаптивной стилизации
- **shadcn/ui** — библиотека UI-компонентов
- **Telegram WebApp SDK** — интеграция с Telegram
- **Axios** — HTTP-клиент
- **JWT + httpOnly cookies** — авторизация

## 🧱 Архитектура

Приложение реализовано по **MVC-подходу**:

- **Model** — типы и структуры данных (TypeScript)
- **View** — компоненты интерфейса с Tailwind + shadcn/ui
- **Controller** — хуки, context, API-запросы

## ⚙️ Возможности

- Вход по номеру зачетки и паролю
- Авторизация через Telegram (`initData`)
- Привязка Telegram ID к аккаунту
- Просмотр расписания на день и неделю
- Профиль студента, выход, отвязка Telegram ID

## 🚀 Запуск проекта

```bash
git clone https://github.com/macmarsala/kipoappbot-frontend.git
cd kipoappbot-frontend
npm install
npm run dev
