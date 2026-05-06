import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  console.log("Sending:", email, password); // 👈 MUST ADD

  try {
    const res = await api.post("/auth/login", {
      email: email.trim(),
      password: password.trim(),
    });

    localStorage.setItem("token", res.data.access_token);
    window.location.href = "/dashboard";
  } catch (err) {
    console.error("ERROR:", err.response?.data);
    alert("Invalid credentials");
  }
};

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}