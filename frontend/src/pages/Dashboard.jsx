import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => setData(res.data));
  }, []);
  const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <a href="/leads">Go to Leads</a>
      <p>Total Leads: {data.totalLeads}</p>
      <p>Won: {data.wonLeads}</p>
      <p>Lost: {data.lostLeads}</p>
    </div>
  );
}