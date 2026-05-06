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
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    handleLogin();
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f3f4f6" }}>
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h2 style={{ margin: "0 0 16px", fontSize: "24px" }}>Login</h2>

        {error && (
          <div
            style={{
              marginBottom: "12px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #fecaca",
              background: "#fef2f2",
              color: "#991b1b",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>Email</label>
        <input
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "12px", border: "1px solid #d1d5db", borderRadius: "8px" }}
        />

        <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>Password</label>
        <input
          value={password}
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "16px", border: "1px solid #d1d5db", borderRadius: "8px" }}
        />

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            background: isLoading ? "#93c5fd" : "#2563eb",
            color: "#ffffff",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}