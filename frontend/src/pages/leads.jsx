import { useEffect, useState } from "react";
import api from "../services/api";
import Notes from "./Notes";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const [form, setForm] = useState({
    leadName: "",
    companyName: "",
    email: "",
    phone: "",
    source: "Website",
    assignedTo: "",
    status: "New",
    dealValue: 0,
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [assignedToFilter, setAssignedToFilter] = useState("");

  async function fetchLeads() {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (statusFilter) params.append("status", statusFilter);
    if (sourceFilter) params.append("source", sourceFilter);
    if (assignedToFilter) params.append("assignedTo", assignedToFilter);

    const query = params.toString();
    const res = await api.get(query ? `/leads?${query}` : "/leads");
    setLeads(res.data);
  }

  useEffect(() => {
    fetchLeads();
  }, [search, statusFilter, sourceFilter, assignedToFilter]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(leads.length / pageSize));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [leads, currentPage]);

  const validateForm = () => {
    const errors = {};
    const trimmedLeadName = form.leadName.trim();
    const trimmedCompanyName = form.companyName.trim();
    const trimmedEmail = form.email.trim();
    const trimmedAssignedTo = form.assignedTo.trim();

    if (!trimmedLeadName) errors.leadName = "Lead name is required.";
    if (!trimmedCompanyName) errors.companyName = "Company name is required.";

    if (!trimmedEmail) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      errors.email = "Enter a valid email address.";
    }

    if (form.phone && !/^[0-9()+\-\s]{7,20}$/.test(form.phone.trim())) {
      errors.phone = "Enter a valid phone number.";
    }

    if (!trimmedAssignedTo) errors.assignedTo = "Assigned salesperson is required.";

    if (Number.isNaN(Number(form.dealValue)) || Number(form.dealValue) < 0) {
      errors.dealValue = "Deal value must be zero or greater.";
    }

    if (!form.source) errors.source = "Source is required.";
    if (!form.status) errors.status = "Status is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingId) {
      await updateLead();
      return;
    }

    await createLead();
  };

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
      phone: "",
      source: "Website",
      assignedTo: "",
      status: "New",
      dealValue: 0,
    });
    setFormErrors({});
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setSourceFilter("");
    setAssignedToFilter("");
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(leads.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLeads = leads.slice(startIndex, startIndex + pageSize);

  const getStatusClass = (status) => {
    switch (status) {
      case "Won":
        return "status-won";
      case "Lost":
        return "status-lost";
      case "Qualified":
        return "status-qualified";
      case "Proposal Sent":
        return "status-proposal";
      case "Contacted":
        return "status-contacted";
      default:
        return "status-new";
    }
  };

  return (
    <div className="app-shell">
      <div className="page-container">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="section-subtitle">Sales Workspace</p>
            <h1 className="section-title">Lead Pipeline</h1>
            <p className="text-slate-500 mt-1">Track outreach, qualify opportunities, and close faster.</p>
          </div>
          <div className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-bold text-white shadow-lg">
            {leads.length} Leads
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur-sm shadow-md">
          <input
            className="input-ui"
            placeholder="Search name, company, email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="input-ui"
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

          <select
            className="input-ui"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="">All Sources</option>
            <option>Website</option>
            <option>LinkedIn</option>
            <option>Referral</option>
            <option>Cold Email</option>
            <option>Event</option>
          </select>

          <input
            className="input-ui"
            placeholder="Assigned to..."
            value={assignedToFilter}
            onChange={(e) => setAssignedToFilter(e.target.value)}
          />

          <div className="flex gap-2">
            <button className="btn-secondary flex-1" onClick={fetchLeads}>Apply</button>
            <button className="btn-ghost flex-1" onClick={resetFilters}>Reset</button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Leads List */}
          <div className="lg:col-span-2 space-y-4">
            {paginatedLeads.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center">
                <p className="text-slate-500">No leads found for current filters.</p>
              </div>
            ) : (
              paginatedLeads.map((lead) => (
                <article key={lead._id} className="surface-card p-6 hover:shadow-2xl transition-shadow">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900">{lead.leadName}</h3>
                      <p className="text-sm text-slate-600 mt-1">{lead.companyName || "No company"}</p>
                    </div>
                    <span className={`status-pill ${getStatusClass(lead.status)}`}>{lead.status}</span>
                  </div>

                  {/* Divider */}
                  <div className="divider mb-4"></div>

                  {/* Lead Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5 text-sm">
                    <div>
                      <p className="text-slate-500 font-medium">Email</p>
                      <p className="text-slate-800 mt-1">{lead.email || "-"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Phone</p>
                      <p className="text-slate-800 mt-1">{lead.phone || "-"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Source</p>
                      <p className="text-slate-800 mt-1">{lead.source || "-"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Assigned</p>
                      <p className="text-slate-800 mt-1">{lead.assignedTo || "-"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Deal Value</p>
                      <p className="text-slate-800 mt-1">${Number(lead.dealValue || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Created</p>
                      <p className="text-slate-800 mt-1">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "-"}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    <button
                      onClick={() => setSelectedLeadId(selectedLeadId === lead._id ? null : lead._id)}
                      className="btn-ghost text-sm"
                    >
                      {selectedLeadId === lead._id ? "✓ Hide Notes" : "View Notes"}
                    </button>

                    <button
                      onClick={() => {
                        setForm({
                          leadName: lead.leadName,
                          companyName: lead.companyName,
                          email: lead.email,
                          phone: lead.phone || "",
                          source: lead.source || "Website",
                          assignedTo: lead.assignedTo || "",
                          status: lead.status,
                          dealValue: lead.dealValue,
                        });
                        setEditingId(lead._id);
                      }}
                      className="btn-secondary text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="btn-danger text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Notes Section */}
                  {selectedLeadId === lead._id && <Notes leadId={lead._id} />}
                </article>
              ))
            )}

            {leads.length > pageSize && (
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
                <p className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Form Sidebar */}
          <aside className="sticky top-6 h-fit">
            <div className="surface-card-subtle p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-1">{editingId ? "Edit Lead" : "Add Lead"}</h3>
              <p className="text-sm text-slate-600 mb-5">Capture the next opportunity in your pipeline.</p>

              <form className="space-y-3" onSubmit={handleFormSubmit} noValidate>
                <input
                  className="input-ui"
                  placeholder="Lead Name"
                  value={form.leadName}
                  onChange={(e) => setForm({ ...form, leadName: e.target.value })}
                />
                {formErrors.leadName && <p className="-mt-2 text-xs text-rose-600">{formErrors.leadName}</p>}

                <input
                  className="input-ui"
                  placeholder="Company"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                />
                {formErrors.companyName && <p className="-mt-2 text-xs text-rose-600">{formErrors.companyName}</p>}

                <input
                  className="input-ui"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {formErrors.email && <p className="-mt-2 text-xs text-rose-600">{formErrors.email}</p>}

                <input
                  className="input-ui"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {formErrors.phone && <p className="-mt-2 text-xs text-rose-600">{formErrors.phone}</p>}

                <select
                  className="input-ui"
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                >
                  <option>Website</option>
                  <option>LinkedIn</option>
                  <option>Referral</option>
                  <option>Cold Email</option>
                  <option>Event</option>
                </select>
                {formErrors.source && <p className="-mt-2 text-xs text-rose-600">{formErrors.source}</p>}

                <input
                  className="input-ui"
                  placeholder="Assigned To"
                  value={form.assignedTo}
                  onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                />
                {formErrors.assignedTo && <p className="-mt-2 text-xs text-rose-600">{formErrors.assignedTo}</p>}

                <input
                  className="input-ui"
                  placeholder="Deal Value"
                  type="number"
                  value={form.dealValue}
                  onChange={(e) => setForm({ ...form, dealValue: Number(e.target.value) })}
                />
                {formErrors.dealValue && <p className="-mt-2 text-xs text-rose-600">{formErrors.dealValue}</p>}

                <select
                  className="input-ui"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Proposal Sent</option>
                  <option>Won</option>
                  <option>Lost</option>
                </select>
                {formErrors.status && <p className="-mt-2 text-xs text-rose-600">{formErrors.status}</p>}

                <button
                  className="btn-primary w-full py-3"
                  type="submit"
                >
                  {editingId ? "Update Lead" : "Add Lead"}
                </button>

                {editingId && (
                  <button
                    className="btn-ghost w-full"
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      resetForm();
                    }}
                  >
                    Cancel Editing
                  </button>
                )}
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
