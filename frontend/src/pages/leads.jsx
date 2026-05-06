import { useEffect, useState } from "react";
import api from "../services/api";
import Notes from "./Notes";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  const [form, setForm] = useState({
    leadName: "",
    companyName: "",
    email: "",
    status: "New",
    dealValue: 0,
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  async function fetchLeads() {
    let url = `/leads?search=${search}`;

    if (statusFilter) {
      url += `&status=${statusFilter}`;
    }

    const res = await api.get(url);
    setLeads(res.data);
  }

  useEffect(() => {
    fetchLeads();
  }, [search, statusFilter]);

  const createLead = async () => {
    await api.post("/leads", form);

    resetForm();
    fetchLeads();
  };

  const updateLead = async () => {
    await api.put(`/leads/${editingId}`, form);

    setEditingId(null);
    resetForm();
    fetchLeads();
  };

  const deleteLead = async (id) => {
    await api.delete(`/leads/${id}`);
    fetchLeads();
  };

  const resetForm = () => {
    setForm({
      leadName: "",
      companyName: "",
      email: "",
      status: "New",
      dealValue: 0,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Leads Management</h2>

      <div>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Proposal Sent</option>
          <option>Won</option>
          <option>Lost</option>
        </select>

        <button onClick={fetchLeads}>Apply</button>
      </div>

      <hr />

      <div>
        {leads.map((lead) => (
          <div
            key={lead._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <p><b>{lead.leadName}</b></p>
            <p>{lead.companyName}</p>
            <p>{lead.email}</p>
            <p>Status: {lead.status}</p>
            <p>Value: {lead.dealValue}</p>

            <button onClick={() => setSelectedLeadId(selectedLeadId === lead._id ? null : lead._id)}>
              {selectedLeadId === lead._id ? "Hide Notes" : "View Notes"}
            </button>

            <button onClick={() => deleteLead(lead._id)}>
              Delete
            </button>

            <button
              onClick={() => {
                setForm({
                  leadName: lead.leadName,
                  companyName: lead.companyName,
                  email: lead.email,
                  status: lead.status,
                  dealValue: lead.dealValue,
                });
                setEditingId(lead._id);
              }}
            >
              Edit
            </button>

            {selectedLeadId === lead._id && (
              <Notes leadId={lead._id} />
            )}
          </div>
        ))}
      </div>

      <hr />

      <h3>{editingId ? "Edit Lead" : "Add Lead"}</h3>

      <input
        placeholder="Lead Name"
        value={form.leadName}
        onChange={(e) =>
          setForm({ ...form, leadName: e.target.value })
        }
      />

      <input
        placeholder="Company"
        value={form.companyName}
        onChange={(e) =>
          setForm({ ...form, companyName: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        placeholder="Deal Value"
        type="number"
        value={form.dealValue}
        onChange={(e) =>
          setForm({ ...form, dealValue: Number(e.target.value) })
        }
      />

      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Proposal Sent</option>
        <option>Won</option>
        <option>Lost</option>
      </select>

      <br /><br />

      <button onClick={editingId ? updateLead : createLead}>
        {editingId ? "Update Lead" : "Add Lead"}
      </button>
    </div>
  );
}
