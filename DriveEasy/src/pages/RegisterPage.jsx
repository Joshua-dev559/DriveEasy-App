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

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
