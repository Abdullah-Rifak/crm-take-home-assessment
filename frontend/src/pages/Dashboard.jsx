import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Dashboard fetch error:", err.response?.data || err.message);
        setError("Unable to load dashboard data.");
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (error) {
    return (
      <div style={{ padding: "24px" }}>
        <h2>Dashboard</h2>
        <p style={{ color: "#b91c1c" }}>{error}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  if (!data) {
    return <div style={{ padding: "24px" }}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: "24px", background: "#f9fafb", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <a
            href="/leads"
            style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "8px",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Go to Leads
          </a>
          <button
            onClick={logout}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
          <p style={{ margin: 0, color: "#6b7280" }}>Total Leads</p>
          <h3 style={{ margin: "8px 0 0" }}>{data.totalLeads}</h3>
        </div>

        <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
          <p style={{ margin: 0, color: "#6b7280" }}>Won</p>
          <h3 style={{ margin: "8px 0 0", color: "#047857" }}>{data.wonLeads}</h3>
        </div>

        <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
          <p style={{ margin: 0, color: "#6b7280" }}>Lost</p>
          <h3 style={{ margin: "8px 0 0", color: "#b91c1c" }}>{data.lostLeads}</h3>
        </div>
      </div>
    </div>
  );
}