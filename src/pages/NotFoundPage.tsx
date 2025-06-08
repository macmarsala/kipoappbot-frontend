import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] px-4 text-center">
      <h1 className="text-4xl font-bold text-primary mb-2">404</h1>
      <p className="text-lg mb-6">Страница не найдена</p>
      <Link
        to="/"
        className="text-sm text-blue-600 hover:underline"
      >
        Вернуться на главную
      </Link>
    </div>
  )
}
