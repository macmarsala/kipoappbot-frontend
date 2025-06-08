import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-svh items-center justify-center p-6 bg-muted">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
