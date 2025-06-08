import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, FileText, User, BookOpen } from "lucide-react";

const navItems = [
  { to: "/", icon: <Home size={24} />, label: "Главная" },
  { to: "/schedule", icon: <Calendar size={24} />, label: "Расписание" },
  { to: "/grades", icon: <FileText size={24} />, label: "Оценки" },
  { to: "/documents", icon: <BookOpen size={24} />, label: "Документы" },
  { to: "/profile", icon: <User size={24} />, label: "Профиль" },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around py-2 pb-10">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center text-xs ${
              location.pathname === item.to ? "text-orange-600" : "text-gray-500"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
