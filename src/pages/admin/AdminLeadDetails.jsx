import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../config/api";

const AdminLeadDetails = () => {
  const { id: leadId } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [allAssociates, setAllAssociates] = useState([]);
  const [loadingAssociates, setLoadingAssociates] = useState(true);
  const [selectedAssociate, setSelectedAssociate] = useState("");
  const [assigning, setAssigning] = useState(false);

  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusForm, setStatusForm] = useState({
    callStatus: "",
    finalStatus: "",
    comment: "",
  });

  const [quickActionLoading, setQuickActionLoading] = useState(false);

  // ─────────────────────────────────────────────
  // INITIAL LOAD  – parallel fetch of enquiry + users
  // ─────────────────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setLoadingAssociates(true);
      try {
        // ✅ FIXED: Use /api/enquiry for leads (NOT /api/kit-enquiry)
        const [leadRes, usersRes] = await Promise.all([
          API.get(`/api/enquiry/${leadId}`),
          API.get("/api/auth/all"),
        ]);

        // ✅ FIXED: backend returns { success, enquiry }
        setLead(leadRes.data.enquiry);

        /* Normalise user-list response (handles array or { users/data } shapes) */
        let allUsers = [];
        if (Array.isArray(usersRes.data)) {
          allUsers = usersRes.data;
        } else if (usersRes.data?.users && Array.isArray(usersRes.data.users)) {
          allUsers = usersRes.data.users;
        } else if (usersRes.data?.data && Array.isArray(usersRes.data.data)) {
          allUsers = usersRes.data.data;
        }

        // Filter out admin
        const customers = allUsers.filter(
          (user) => user.role?.toLowerCase() !== "admin"
        );
        setAllAssociates(customers);

        // Auto-open assign modal if not yet assigned
        if (!leadRes.data.enquiry.assignedTo) {
          setAssignModalOpen(true);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        alert("Failed to load lead details");
      } finally {
        setLoading(false);
        setLoadingAssociates(false);
      }
    };

    loadData();
  }, [leadId]);

  // ─────────────────────────────────────────────
  // RE-FETCH single enquiry (after an update)
  // ─────────────────────────────────────────────
  const fetchLead = async () => {
    try {
      // ✅ FIXED: Use /api/enquiry for leads
      const res = await API.get(`/api/enquiry/${leadId}`);
      setLead(res.data.enquiry);
    } catch (error) {
      console.error("Error fetching lead:", error);
      alert("Failed to load lead details");
    }
  };

  // ─────────────────────────────────────────────
  // ASSIGN LEAD
  // ─────────────────────────────────────────────
  const handleAssignLead = async () => {
    if (!selectedAssociate) {
      alert("Please select an associate!");
      return;
    }

    setAssigning(true);
    try {
      // ✅ FIXED: Use /api/enquiry/:id/assign for leads
      await API.put(`/api/enquiry/${leadId}/assign`, {
        associateId: selectedAssociate,
      });

      alert("Lead assigned successfully!");
      setAssignModalOpen(false);
      setSelectedAssociate("");
      fetchLead();
    } catch (error) {
      console.error("Error assigning lead:", error);
      alert("Failed to assign lead. Please try again.");
    } finally {
      setAssigning(false);
    }
  };

  // ─────────────────────────────────────────────
  // "Update Status" MODAL  –  PUT (callStatus / finalStatus / comment)
  // ─────────────────────────────────────────────
  const handleStatusUpdate = async () => {
    if (!statusForm.callStatus && !statusForm.finalStatus) {
      alert("Please select at least one status!");
      return;
    }

    setUpdatingStatus(true);
    try {
      // ✅ FIXED: Use /api/enquiry/:id/status for leads
      await API.put(`/api/enquiry/${leadId}/status`, statusForm);

      alert("Status updated successfully!");
      setStatusModalOpen(false);
      setStatusForm({ callStatus: "", finalStatus: "", comment: "" });
      fetchLead();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  // ─────────────────────────────────────────────
  // QUICK-ACTION BUTTONS  –  PATCH (status only)
  // ─────────────────────────────────────────────
  const handleQuickStatusUpdate = async (newStatus) => {
    if (quickActionLoading) return;

    const confirmMessage = {
      ACTIVE: "Mark this enquiry as ACTIVE (contacted)?",
      CONFIRMED: "Mark this enquiry as CONFIRMED (contacted successfully)?",
      COMPLETED: "Mark this enquiry as COMPLETED?",
      CANCELLED: "Cancel this enquiry? This cannot be undone.",
    };

    if (!window.confirm(confirmMessage[newStatus] || "Update enquiry status?")) {
      return;
    }

    setQuickActionLoading(true);
    try {
      // ✅ FIXED: Use /api/enquiry/:id/status for leads
      const response = await API.patch(`/api/enquiry/${leadId}/status`, {
        status: newStatus,
      });

      console.log("Update response:", response.data);
      alert(`Enquiry status updated to ${newStatus} successfully!`);
      fetchLead();
    } catch (error) {
      console.error("Error updating status:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to update status. Please try again.";
      alert(`Error: ${errorMsg}`);
    } finally {
      setQuickActionLoading(false);
    }
  };

  // "Contact via Email" just marks as ACTIVE for now
  const handleContactViaEmail = () => {
    handleQuickStatusUpdate("ACTIVE");
  };

  // ─────────────────────────────────────────────
  // LOADING  /  NOT-FOUND  screens
  // ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading lead details...</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xl text-gray-600 mb-4">Lead not found</p>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ─── helpers ────────────────────────────────
  const getStatusColor = (status) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
      new: "bg-yellow-100 text-yellow-800 border-yellow-200",
      ACTIVE: "bg-green-100 text-green-800 border-green-200",
      contacted: "bg-green-100 text-green-800 border-green-200",
      CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
      quoted: "bg-blue-100 text-blue-800 border-blue-200",
      COMPLETED: "bg-purple-100 text-purple-800 border-purple-200",
      won: "bg-purple-100 text-purple-800 border-purple-200",
      CANCELLED: "bg-red-100 text-red-800 border-red-200",
      lost: "bg-red-100 text-red-800 border-red-200",
      IN_PROCESS: "bg-blue-100 text-blue-800 border-blue-200",
      NOT_INTERESTED: "bg-red-100 text-red-800 border-red-200",
      CONVERTED: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getCallStatusBadge = (status) => {
    const badges = {
      CONNECTED: "✅ Connected",
      DNP: "📵 DNP",
      WRONG_NUMBER: "❌ Wrong Number",
      CALL_BACK: "🔄 Call Back",
    };
    return badges[status] || status;
  };

  // The enquiry stores the customer's name in either `name` or `fullName`
  const displayName = lead.fullName || lead.name || "Unknown";

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* ── Header ── */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate("/admin/dashboard", { state: { openLeadsModal: true } })}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Leads</span>
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{displayName}</h1>
                <p className="text-sm text-gray-500 mt-1">Lead Details – Admin View</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              {/* Update Status button (opens modal) */}
              <button
                onClick={() => setStatusModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Status
              </button>

              {/* Assign button – only visible when not yet assigned */}
              {!lead.assignedTo && (
                <button
                  onClick={() => setAssignModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 animate-pulse"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Assign Lead
                </button>
              )}

              {/* Status badges */}
              {lead.status && (
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(lead.status)}`}>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span>{lead.status.replace("_", " ")}</span>
                </div>
              )}
              {lead.callStatus && (
                <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold border border-purple-200">
                  {getCallStatusBadge(lead.callStatus)}
                </div>
              )}
              {lead.finalStatus && (
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(lead.finalStatus)}`}>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span>{lead.finalStatus.replace("_", " ")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left Column ── */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm text-gray-900 break-all">{lead.email}</p>
                  </div>
                </div>

                {lead.phone && (
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Phone</p>
                      <p className="text-sm text-gray-900">{lead.phone}</p>
                    </div>
                  </div>
                )}

                {lead.location && (
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Location</p>
                      <p className="text-sm text-gray-900">{lead.location}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Created</p>
                    <p className="text-sm text-gray-900">{new Date(lead.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {/* <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-lg p-6 border-2 border-pink-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h2>

              <div className="space-y-2">
                <button
                  onClick={handleContactViaEmail}
                  disabled={quickActionLoading || lead.status === "CANCELLED"}
                  className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    quickActionLoading || lead.status === "CANCELLED"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact via Email
                </button>

                <button
                  onClick={() => handleQuickStatusUpdate("CONFIRMED")}
                  disabled={quickActionLoading || lead.status === "CANCELLED"}
                  className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    quickActionLoading || lead.status === "CANCELLED"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mark as Contacted
                </button>

                <button
                  onClick={() => handleQuickStatusUpdate("COMPLETED")}
                  disabled={quickActionLoading || lead.status === "CANCELLED"}
                  className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    quickActionLoading || lead.status === "CANCELLED"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Completed
                </button>

                <button
                  onClick={() => handleQuickStatusUpdate("CANCELLED")}
                  disabled={quickActionLoading || lead.status === "CANCELLED"}
                  className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    quickActionLoading || lead.status === "CANCELLED"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {lead.status === "CANCELLED" ? "Cancelled" : "Cancel Enquiry"}
                </button>

                {quickActionLoading && (
                  <div className="text-center text-sm text-gray-600 mt-2">
                    <svg className="animate-spin w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Updating...
                  </div>
                )}
              </div>
            </div> */}

            {/* Assigned Associate / Pending Assignment */}
            {lead.assignedTo ? (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6 border border-blue-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Assigned To
                </h2>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="font-semibold text-gray-900">{lead.assignedTo.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{lead.assignedTo.email}</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Associate Role</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                      {lead.assignedTo.role || "Associate"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 border-2 border-yellow-300">
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Pending Assignment</h3>
                  <p className="text-sm text-gray-600 mb-4">This lead hasn't been assigned to any associate yet.</p>
                  <button
                    onClick={() => setAssignModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Assign Now
                  </button>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Quick Stats
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Activities</span>
                  <span className="font-bold text-gray-900">{lead.history?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Communications</span>
                  <span className="font-bold text-gray-900">{lead.communications?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-xs text-gray-600">
                    {lead.updatedAt ? new Date(lead.updatedAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column – Activity & Communications ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity History */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Activity History
              </h2>

              {!lead.history || lead.history.length === 0 ? (
                <div className="text-center py-8">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">No activity history yet</p>
                  <p className="text-sm text-gray-500 mt-1">Updates and status changes will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {[...lead.history].reverse().map((h, i) => (
                    <div key={i} className="flex space-x-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex-shrink-0">
                        <div className="bg-orange-100 rounded-full p-2">
                          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{h.action}</p>
                        {h.comment && (
                          <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-700">{h.comment}</p>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(h.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Communications Log */}
            {lead.communications && lead.communications.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Communications Log
                </h2>
                <div className="space-y-3">
                  {lead.communications.map((comm, i) => (
                    <div key={i} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-blue-900">
                          {comm.type === "CALL" && "📞 Call"}
                          {comm.type === "WHATSAPP" && "💬 WhatsApp"}
                          {comm.type === "EMAIL" && "📧 Email"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comm.timestamp || comm.sentAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comm.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ASSIGN LEAD MODAL
          ════════════════════════════════════════ */}
      {assignModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Assign Lead
              </h2>
              <button onClick={() => setAssignModalOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select User to Assign *
                  {!loadingAssociates && allAssociates.length > 0 && (
                    <span className="text-green-600 ml-2">({allAssociates.length} users available)</span>
                  )}
                  {!loadingAssociates && allAssociates.length === 0 && (
                    <span className="text-red-600 ml-2">(No users found)</span>
                  )}
                </label>

                {loadingAssociates ? (
                  <div className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
                    <svg className="animate-spin w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-gray-600">Loading users...</span>
                  </div>
                ) : (
                  <select
                    value={selectedAssociate}
                    onChange={(e) => setSelectedAssociate(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    disabled={allAssociates.length === 0}
                  >
                    <option value="">
                      {allAssociates.length === 0 ? "-- No Users Available --" : "-- Choose User to Assign --"}
                    </option>
                    {allAssociates.map((associate) => (
                      <option key={associate._id} value={associate._id}>
                        {associate.name} ({associate.email}) - {associate.role}
                      </option>
                    ))}
                  </select>
                )}

                {!loadingAssociates && allAssociates.length === 0 && (
                  <p className="text-sm text-red-600 mt-2">⚠️ No users found. Please create user accounts first.</p>
                )}
              </div>

              {selectedAssociate && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Lead:</strong> {displayName}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Will be assigned to:</strong>{" "}
                    {allAssociates.find((a) => a._id === selectedAssociate)?.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Status will automatically change to ACTIVE</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleAssignLead}
                  disabled={!selectedAssociate || assigning}
                  className={`flex-1 py-3 rounded-lg font-bold transition ${
                    !selectedAssociate || assigning
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
                  }`}
                >
                  {assigning ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Assigning...
                    </span>
                  ) : (
                    "Assign Lead"
                  )}
                </button>
                <button
                  onClick={() => setAssignModalOpen(false)}
                  disabled={assigning}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          STATUS UPDATE MODAL  (callStatus / finalStatus / comment)
          ════════════════════════════════════════ */}
      {statusModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Lead Status
              </h2>
              <button onClick={() => setStatusModalOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Call Status</label>
                <select
                  value={statusForm.callStatus}
                  onChange={(e) => setStatusForm({ ...statusForm, callStatus: e.target.value })}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">-- Select Call Status --</option>
                  <option value="CONNECTED">✅ Connected</option>
                  <option value="DNP">📵 DNP</option>
                  <option value="WRONG_NUMBER">❌ Wrong Number</option>
                  <option value="CALL_BACK">🔄 Call Back</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Final Status</label>
                <select
                  value={statusForm.finalStatus}
                  onChange={(e) => setStatusForm({ ...statusForm, finalStatus: e.target.value })}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">-- Select Final Status --</option>
                  <option value="IN_PROCESS">🔵 In Process</option>
                  <option value="CONVERTED">🟢 Converted</option>
                  <option value="NOT_INTERESTED">🔴 Not Interested</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Comment (Optional)</label>
                <textarea
                  value={statusForm.comment}
                  onChange={(e) => setStatusForm({ ...statusForm, comment: e.target.value })}
                  placeholder="Add notes about this status update..."
                  rows={3}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {(statusForm.callStatus || statusForm.finalStatus) && (
                <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Updating:</strong> {displayName}
                  </p>
                  {statusForm.callStatus && (
                    <p className="text-sm text-gray-700 mt-1">
                      Call Status → <strong>{statusForm.callStatus}</strong>
                    </p>
                  )}
                  {statusForm.finalStatus && (
                    <p className="text-sm text-gray-700 mt-1">
                      Final Status → <strong>{statusForm.finalStatus}</strong>
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleStatusUpdate}
                  disabled={(!statusForm.callStatus && !statusForm.finalStatus) || updatingStatus}
                  className={`flex-1 py-3 rounded-lg font-bold transition ${
                    (!statusForm.callStatus && !statusForm.finalStatus) || updatingStatus
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg"
                  }`}
                >
                  {updatingStatus ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Update Status"
                  )}
                </button>
                <button
                  onClick={() => setStatusModalOpen(false)}
                  disabled={updatingStatus}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeadDetails;