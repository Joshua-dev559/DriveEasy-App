import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../api";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await registerUser(form);
      login(user, token);
      navigate("/fleet", { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/cars/tesla.jpg')] bg-cover bg-center opacity-10" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl">🚗</span>
          <h1 className="text-2xl font-bold text-gray-900">DriveEasy</h1>
        </div>
        <p className="text-center text-gray-500 text-sm mb-8">Your journey starts here</p>

        {error && <p className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2.5 mb-4 text-center">{error}</p>}

        <form onSubmit={submit} className="space-y-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-600">
            Full Name
            <input name="name" value={form.name} onChange={handle} placeholder="Jane Doe" required
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-blue-500" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-600">
            Email
            <input name="email" type="email" value={form.email} onChange={handle} placeholder="jane@example.com" required
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-blue-500" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-600">
            Password
            <input name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" required minLength={6}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-blue-500" />
          </label>
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition mt-2">
            {loading ? "Please wait…" : "Create Account"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <a href={`${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:5000'}/api/auth/github`}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Continue with GitHub
        </a>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
