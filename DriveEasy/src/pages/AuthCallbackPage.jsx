import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthCallbackPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(queryString);
    const token = params.get("token");
    const userParam = params.get("user");
    if (token && userParam) {
      const user = JSON.parse(decodeURIComponent(userParam));
      login(user, token);
      navigate("/fleet", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <p className="text-white text-lg">Signing you in...</p>
    </div>
  );
}
