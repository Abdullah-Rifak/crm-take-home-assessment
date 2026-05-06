import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    handleLogin();
  };

  return (
    <div className="app-shell">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="section-title mb-2">Welcome to CRM</h1>
            <p className="text-slate-500">Manage your leads and grow your business</p>
          </div>

          {/* Card */}
          <div className="surface-card p-8">
            {error && (
              <div className="mb-6 rounded-lg border-l-4 border-rose-500 bg-rose-50 p-4">
                <p className="text-sm font-medium text-rose-800">{error}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  className="input-ui"
                  type="email"
                  value={email}
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input
                  className="input-ui"
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 text-base">
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="divider my-6"></div>

            <button
              type="button"
              onClick={() => { setEmail('admin@example.com'); setPassword('password123'); }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-700 transition"
            >
              Demo credentials pre-filled ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}