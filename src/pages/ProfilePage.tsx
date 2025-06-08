import { useAuth } from "@/hooks/useAuth";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "@/hooks/useStudent";

export default function ProfilePage() {
  const { student, loading, error } = useStudent();
  const { logout } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();

  if (loading) return <div className="p-4 text-gray-500">Загрузка...</div>;
  if (error || !student) return <div className="p-4 text-gray-500">Сведения не найдены.</div>;

  const handleLogout = async () => {
    if (!confirmLogout) {
      setConfirmLogout(true);
      return;
    }
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="pt-8 p-4 pb-12 space-y-8">
      <h1 className="text-2xl font-semibold">Профиль</h1>
      <div className="flex flex-col items-center space-y-3">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-10 h-10 text-gray-500" />
        </div>
        <h2 className="text-xl font-bold">{student.fullName}</h2>
      </div>
      <div className="space-y-3">
        <InfoRow label="Группа" value={student.group} />
        <InfoRow label="Номер зачетки" value={student.cardNumber} />
        <InfoRow label="Телефон" value={student.phone} />
        <InfoRow label="Имя куратора" value={student.curatorName} />
        <InfoRow label="Телефон куратора" value={student.curatorPhone} />
      </div>
      <div className="pt-6">
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          {confirmLogout ? "Подтвердите выход" : "Выйти из аккаунта"}
        </Button>
        {confirmLogout && (
          <p className="mt-2 text-sm text-red-600 text-center">
            Вы уверены, что хотите выйти? Это разъединит Telegram-аккаунт и зачетку.
          </p>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm border-b border-gray-100 pb-1">
      <span className="text-gray-500">{label}</span>
      <span className="text-right text-gray-900">{value}</span>
    </div>
  );
}
