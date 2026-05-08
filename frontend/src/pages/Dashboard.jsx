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
      <div className="page-container">
        <div className="surface-card p-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <p className="text-rose-600 dark:text-rose-400 mt-2">{error}</p>
          <button onClick={logout} className="btn-ghost mt-3">Logout</button>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="page-container text-slate-900 dark:text-slate-100">Loading dashboard...</div>;
  }

  return (
    <div className="app-shell">
      <div className="page-container">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="section-title">Dashboard</h1>
            <p className="section-subtitle mt-1">Welcome back! Here's your CRM overview.</p>
          </div>

          <div className="flex gap-3">
            <a href="/leads" className="btn-primary">Go to Leads</a>
            <button onClick={logout} className="btn-ghost">Logout</button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="metric-card">
            <p className="metric-label">Total Leads</p>
            <p className="metric-value">{data.totalLeads}</p>
          </div>

          <div className="metric-card">
            <p className="metric-label">New Leads</p>
            <p className="metric-value">{data.newLeads}</p>
          </div>

          <div className="metric-card">
            <p className="metric-label">Qualified</p>
            <p className="metric-value">{data.qualifiedLeads}</p>
          </div>

          <div className="metric-card">
            <p className="metric-label">Won Deals</p>
            <p className="metric-value text-emerald-600 dark:text-emerald-400">{data.wonLeads}</p>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Deal Value Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="metric-card">
              <p className="metric-label">Total Estimated Value</p>
              <p className="metric-value">${Number(data.totalEstimatedValue || 0).toLocaleString()}</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Won Value</p>
              <p className="metric-value text-emerald-600 dark:text-emerald-400">${Number(data.totalWonValue || 0).toLocaleString()}</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Lost Leads</p>
              <p className="metric-value text-rose-600 dark:text-rose-400">{data.lostLeads}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}