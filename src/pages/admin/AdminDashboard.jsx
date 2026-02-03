import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Settings,
  Activity,
  Home,
  X,
  Users,
  FileText,
  UserPlus,
  Check,
  Loader2,
  Package,
  ClipboardList,
} from "lucide-react";
import API from "../../config/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  
  const [allUsers, setAllUsers] = useState([]);
  const [allLeads, setAllLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔥 Pagination states for leads modal
  const [leadsPage, setLeadsPage] = useState(1);
  const [leadsTotalPages, setLeadsTotalPages] = useState(1);
  
  // 🔥 Track current filter type
  const [currentAssignedFilter, setCurrentAssignedFilter] = useState("");

  // Bulk Assign States
  const [bulkAssignOpen, setBulkAssignOpen] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedAssociate, setSelectedAssociate] = useState("");
  const [bulkSearchTerm, setBulkSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [hoveringCard, setHoveringCard] = useState(null);

  // 🔥 NEW: Separate pagination states for bulk assign modal
  const [bulkLeadsPage, setBulkLeadsPage] = useState(1);
  const [bulkLeadsTotalPages, setBulkLeadsTotalPages] = useState(1);
  const [bulkLeadsTotal, setBulkLeadsTotal] = useState(0);

  // 🔥 Role Change States
  const [roleChangeModalOpen, setRoleChangeModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [updatingRole, setUpdatingRole] = useState(false);

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalLeads: 0,
    pendingLeads: 0,
    activeLeads: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/auth");
      return;
    }
    setAdmin(user);
    fetchDashboardData();
    fetchAllUsers();
    
    // 🔥 Check if we need to auto-open leads modal
    if (location.state?.openLeadsModal) {
      openModal("leads");
      window.history.replaceState({}, document.title);
    }
  }, [navigate, location]);

  const fetchAllUsers = async () => {
    setLoadingUsers(true);
    try {
      const usersRes = await API.get("/api/auth/all");
      setAllUsers(usersRes.data || []);
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // 🔥 Server-side pagination with assigned filter (for leads modal)
  const fetchLeads = async (page = 1, search = "", assigned = "") => {
    try {
      const params = { page, limit: 20 };
      if (search) params.search = search;
      if (assigned) params.assigned = assigned;

      const res = await API.get("/api/enquiry", { params });

      setAllLeads(res.data.enquiries || []);
      setLeadsTotalPages(res.data.pagination?.pages || 1);
      setLeadsPage(page);
    } catch (error) {
      console.error("Fetch leads error:", error);
    }
  };

  // 🔥 NEW: Separate fetch function for bulk assign modal with pagination (ONLY UNASSIGNED LEADS)
  const fetchBulkLeads = async (page = 1, search = "") => {
    setLoadingLeads(true);
    try {
      const params = { 
        page, 
        limit: 20,
        assigned: "no" // 🔥 ONLY fetch unassigned/pending leads
      };
      if (search) params.search = search;

      const res = await API.get("/api/enquiry", { params });

      setAllLeads(res.data.enquiries || []);
      setBulkLeadsTotalPages(res.data.pagination?.pages || 1);
      setBulkLeadsTotal(res.data.pagination?.total || 0);
      setBulkLeadsPage(page);
    } catch (error) {
      console.error("Fetch bulk leads error:", error);
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/auth/dashboard/summary");
      setDashboardData({
        totalUsers: res.data.totalUsers ?? 0,
        totalLeads: res.data.totalLeads ?? 0,
        pendingLeads: res.data.pendingLeads ?? 0,
        activeLeads: res.data.activeLeads ?? 0,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
    setSearchTerm("");
    setCurrentAssignedFilter(""); // Reset filter
    if (type === "users") {
      fetchAllUsers();
    } else if (type === "leads") {
      fetchLeads(1);
    }
  };

  // 🔥 Open leads modal filtered by type (pending/active)
  const openLeadsByType = (type) => {
    setModalType("leads");
    setModalOpen(true);
    setSearchTerm("");

    if (type === "pending") {
      setCurrentAssignedFilter("no");
      fetchLeads(1, "", "no");
    }
    if (type === "active") {
      setCurrentAssignedFilter("yes");
      fetchLeads(1, "", "yes");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSearchTerm("");
  };

  // 🔥 UPDATED: Open bulk assign with pagination
  const openBulkAssign = async () => {
    setBulkAssignOpen(true);
    setSelectedLeads([]);
    setSelectedAssociate("");
    setBulkSearchTerm("");
    setSuccessMessage("");
    setBulkLeadsPage(1); // 🔥 Reset to page 1
    
    setLoadingLeads(true);
    try {
      await Promise.all([
        fetchBulkLeads(1, ""), // 🔥 Use fetchBulkLeads instead of fetchLeads
        allUsers.length === 0 ? fetchAllUsers() : Promise.resolve()
      ]);
    } catch (error) {
      console.error("Error loading bulk assign data:", error);
    } finally {
      setLoadingLeads(false);
    }
  };

  const closeBulkAssign = () => {
    setBulkAssignOpen(false);
    setSelectedLeads([]);
    setSelectedAssociate("");
    setBulkSearchTerm("");
  };

  const handleSelectLead = (leadId) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  // 🔥 UPDATED: Handle search with pagination reset
  const handleSearchLeads = (searchValue) => {
    setBulkSearchTerm(searchValue);
    setBulkLeadsPage(1); // 🔥 Reset to page 1 on search
    fetchBulkLeads(1, searchValue); // 🔥 Use fetchBulkLeads
  };

  // 🔥 NEW: Handle pagination change for bulk assign
  const handleBulkLeadsPageChange = (newPage) => {
    fetchBulkLeads(newPage, bulkSearchTerm);
  };

  // 🔥 UPDATED: Refresh current page after bulk assign
  const handleBulkAssign = async () => {
    if (!selectedAssociate || selectedLeads.length === 0) {
      alert("Please select leads and an associate!");
      return;
    }

    try {
      setLoading(true);
      await API.post("/api/enquiry/assign/bulk", {
        leadIds: selectedLeads,
        associateId: selectedAssociate,
      });

      setSuccessMessage(`Successfully assigned ${selectedLeads.length} leads!`);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
      setSelectedLeads([]);
      setSelectedAssociate("");
      fetchBulkLeads(bulkLeadsPage, bulkSearchTerm); // 🔥 Stay on current page
    } catch (error) {
      console.error("Bulk assign error:", error);
      alert("Failed to assign leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData =
    modalType === "users"
      ? allUsers.filter((u) =>
          searchTerm
            ? u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              u.email?.toLowerCase().includes(searchTerm.toLowerCase())
            : true
        )
      : allLeads;

  // 🔥 UPDATED: Filter out admin users - only show customers
  const availableUsers = allUsers.filter(u => u.role?.toLowerCase() !== "admin");
  const selectedAssociateName = availableUsers.find(a => a._id === selectedAssociate)?.name;

  // 🔥 Role Change Functions
  const openRoleChangeModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setRoleChangeModalOpen(true);
  };

  const closeRoleChangeModal = () => {
    setRoleChangeModalOpen(false);
    setSelectedUser(null);
    setNewRole("");
  };

  const handleRoleChange = async () => {
    if (!newRole || newRole === selectedUser?.role) {
      alert("Please select a different role!");
      return;
    }

    setUpdatingRole(true);
    try {
      await API.put(`/api/auth/${selectedUser._id}/role`, {
        role: newRole,
      });

      alert(`User role updated to ${newRole} successfully!`);
      closeRoleChangeModal();
      fetchAllUsers(); // Refresh users list
      fetchDashboardData(); // Refresh stats
    } catch (error) {
      console.error("Role update error:", error);
      alert(error.response?.data?.message || "Failed to update role");
    } finally {
      setUpdatingRole(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-xl hidden lg:block">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings className="text-cyan-600" size={24} />
            <span>Admin Panel</span>
          </h2>
        </div>
        <ul className="p-4 space-y-2">
          <li 
            onClick={() => navigate("/")}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-cyan-50 transition"
          >
            <Home size={18} />
            <span>Home</span>
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg bg-cyan-100 font-semibold text-cyan-700">
            <Activity size={18} />
            <span>Dashboard</span>
          </li>
          <li 
            onClick={() => navigate("/admin/products")}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-cyan-50 transition"
          >
            <Package size={18} />
            <span>Products</span>
          </li>
          <li 
            onClick={() => navigate("/admin/kit-enquiries")}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-cyan-50 transition"
          >
            <ClipboardList size={18} />
            <span>Kit Enquiries</span>
          </li>
          <li 
            onClick={logout}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-50 text-red-600 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {admin?.name} 👋
            </h1>
            <p className="text-gray-600">Here's what's happening today</p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Total Users"
              value={dashboardData.totalUsers}
              icon={<Users className="text-blue-600" size={28} />}
              gradient="from-blue-50 to-blue-100"
              onClick={() => openModal("users")}
              onHover={() => setHoveringCard("users")}
              onLeave={() => setHoveringCard(null)}
              isHovering={hoveringCard === "users"}
            />
            <StatCard
              title="Total Leads"
              value={dashboardData.totalLeads}
              icon={<FileText className="text-green-600" size={28} />}
              gradient="from-green-50 to-green-100"
              onClick={() => openModal("leads")}
              onHover={() => setHoveringCard("leads")}
              onLeave={() => setHoveringCard(null)}
              isHovering={hoveringCard === "leads"}
            />
            <StatCard
              title="Pending Leads"
              value={dashboardData.pendingLeads}
              icon={<Activity className="text-yellow-600" size={28} />}
              gradient="from-yellow-50 to-yellow-100"
              onClick={() => openLeadsByType("pending")}
              onHover={() => setHoveringCard("pending")}
              onLeave={() => setHoveringCard(null)}
              isHovering={hoveringCard === "pending"}
            />
            <StatCard
              title="Active Leads"
              value={dashboardData.activeLeads}
              icon={<Activity className="text-purple-600" size={28} />}
              gradient="from-purple-50 to-purple-100"
              onClick={() => openLeadsByType("active")}
              onHover={() => setHoveringCard("active")}
              onLeave={() => setHoveringCard(null)}
              isHovering={hoveringCard === "active"}
            />
          </div>

          {/* BULK ASSIGN SECTION */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg p-6 mb-10 border-2 border-purple-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <UserPlus className="text-purple-600" size={32} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Bulk Assign Leads</h2>
                  <p className="text-gray-600 text-sm">Select multiple leads and assign to an associate</p>
                </div>
              </div>
              <button
                onClick={openBulkAssign}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg"
              >
                Start Bulk Assign
              </button>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => openModal("users")}
                className="flex items-center gap-3 p-4 border-2 border-cyan-200 rounded-lg hover:bg-cyan-50 transition"
              >
                <Users className="text-cyan-600" size={24} />
                <span className="font-semibold">View All Users</span>
              </button>
              <button
                onClick={() => openModal("leads")}
                className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition"
              >
                <FileText className="text-green-600" size={24} />
                <span className="font-semibold">View All Leads</span>
              </button>
              <button
                onClick={() => navigate("/admin/products")}
                className="flex items-center gap-3 p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition"
              >
                <Package className="text-purple-600" size={24} />
                <span className="font-semibold">Manage Products</span>
              </button>
              <button
                onClick={() => navigate("/admin/kit-enquiries")}
                className="flex items-center gap-3 p-4 border-2 border-pink-200 rounded-lg hover:bg-pink-50 transition"
              >
                <ClipboardList className="text-pink-600" size={24} />
                <span className="font-semibold">Kit Enquiries</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW MODAL (Users/Leads) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
              <h2 className="text-xl font-bold">
                {modalType === "users" ? "All Users" : 
                  currentAssignedFilter === "yes" ? "Active Leads (Assigned)" :
                  currentAssignedFilter === "no" ? "Pending Leads (Unassigned)" :
                  "All Leads"
                }
              </h2>
              <button onClick={closeModal} className="hover:bg-white/20 p-2 rounded-full transition">
                <X size={24} />
              </button>
            </div>

            <div className="p-5 border-b bg-gray-50">
              <input
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  if (modalType === "leads") {
                    fetchLeads(1, value, currentAssignedFilter);
                  }
                }}
                placeholder={`Search ${modalType} by name or email...`}
                className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="p-5 max-h-[60vh] overflow-y-auto">
              {modalType === "users" && loadingUsers ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="animate-spin text-cyan-600" size={40} />
                </div>
              ) : filteredData.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 text-lg">No {modalType} found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredData.map((item) => (
                    <div 
                      key={item._id} 
                      onClick={() => {
                        if (modalType === "leads") {
                          navigate(`/admin/lead/${item._id}`);
                        }
                      }}
                      className={`border-2 border-gray-200 p-4 rounded-lg hover:border-cyan-400 transition ${
                        modalType === "leads" ? "cursor-pointer hover:bg-cyan-50 hover:shadow-md" : ""
                      }`}
                    >
                      <p className="font-semibold text-lg">{item.name || item.fullName}</p>
                      <p className="text-sm text-gray-600">{item.email}</p>
                      {item.phone && (
                        <p className="text-sm text-gray-500">{item.phone}</p>
                      )}
                      
                      {modalType === "leads" && item.assignedTo && (
                        <div className="mt-2 flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-xs text-purple-700 font-medium">
                            Assigned to: {item.assignedTo.name || item.assignedTo.email}
                          </span>
                        </div>
                      )}
                      
                      {item.role && (
                        <span className="inline-block mt-2 px-3 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full font-semibold">
                          {item.role}
                        </span>
                      )}
                      
                      {modalType === "users" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openRoleChangeModal(item);
                          }}
                          className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition font-semibold"
                        >
                          Change Role
                        </button>
                      )}
                      
                      {item.status && (
                        <span className="inline-block mt-2 ml-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                          {item.status}
                        </span>
                      )}
                      {modalType === "leads" && (
                        <p className="text-xs text-cyan-600 mt-2 font-medium">
                          {item.assignedTo 
                            ? "Click to view full details →" 
                            : "Click to assign lead →"
                          }
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination controls for leads */}
              {modalType === "leads" && filteredData.length > 0 && (
                <div className="flex justify-between items-center mt-6 border-t pt-4">
                  <button
                    disabled={leadsPage === 1}
                    onClick={() => fetchLeads(leadsPage - 1, searchTerm, currentAssignedFilter)}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-600 transition"
                  >
                    Previous
                  </button>

                  <span className="font-semibold text-gray-700">
                    Page {leadsPage} of {leadsTotalPages}
                  </span>

                  <button
                    disabled={leadsPage === leadsTotalPages}
                    onClick={() => fetchLeads(leadsPage + 1, searchTerm, currentAssignedFilter)}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-600 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ROLE CHANGE MODAL */}
      {roleChangeModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users size={24} />
                Change User Role
              </h2>
              <button
                onClick={closeRoleChangeModal}
                className="hover:bg-white/20 p-2 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">User</p>
                <p className="font-semibold text-gray-900">{selectedUser.name}</p>
                <p className="text-sm text-gray-600">{selectedUser.email}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Role
                </label>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-sm rounded-full font-semibold">
                    {selectedUser.role}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Role *
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="customer">👤 Customer</option>
                  <option value="associate">👔 Associate</option>
                  <option value="admin">👑 Admin</option>
                </select>
              </div>

              {newRole && newRole !== selectedUser.role && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ <strong>Warning:</strong> Changing role from <strong>{selectedUser.role}</strong> to <strong>{newRole}</strong> will update user permissions immediately.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleRoleChange}
                  disabled={!newRole || newRole === selectedUser.role || updatingRole}
                  className={`flex-1 py-3 rounded-lg font-bold transition ${
                    !newRole || newRole === selectedUser.role || updatingRole
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                  }`}
                >
                  {updatingRole ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      Updating...
                    </span>
                  ) : (
                    "Update Role"
                  )}
                </button>

                <button
                  onClick={closeRoleChangeModal}
                  disabled={updatingRole}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BULK ASSIGN MODAL - 🔥 UPDATED WITH PAGINATION */}
      {bulkAssignOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* HEADER */}
            <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <UserPlus size={28} />
                Bulk Assign Leads
              </h2>
              <button onClick={closeBulkAssign} className="hover:bg-white/20 p-2 rounded-full transition">
                <X size={24} />
              </button>
            </div>

            {/* SUCCESS MESSAGE */}
            {successMessage && (
              <div className="p-4 bg-green-100 border-b-2 border-green-500 text-green-800 flex items-center gap-3">
                <Check size={24} />
                <span className="font-semibold">{successMessage}</span>
              </div>
            )}

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid lg:grid-cols-3 gap-6 p-6">
                {/* LEADS SELECTION */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <input
                      value={bulkSearchTerm}
                      onChange={(e) => handleSearchLeads(e.target.value)}
                      placeholder="Search leads by name, email, phone, or company..."
                      className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* 🔥 Pagination Info - Only Unassigned Leads */}
                  <div className="mb-4 bg-purple-50 p-3 rounded-lg flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      <strong>Showing Unassigned Leads:</strong> Page {bulkLeadsPage} of {bulkLeadsTotalPages} 
                      {bulkLeadsTotal > 0 && ` (${bulkLeadsTotal.toLocaleString()} pending leads)`}
                    </p>
                    <p className="text-xs text-gray-500">
                      💡 Only unassigned leads shown
                    </p>
                  </div>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {loadingLeads ? (
                      <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-purple-600" size={40} />
                      </div>
                    ) : allLeads.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-gray-500">No leads found</p>
                        {bulkSearchTerm && (
                          <p className="text-sm text-gray-400 mt-2">
                            Try adjusting your search
                          </p>
                        )}
                      </div>
                    ) : (
                      allLeads.map((lead) => (
                        <div
                          key={lead._id}
                          onClick={() => handleSelectLead(lead._id)}
                          className={`border-2 p-4 rounded-lg cursor-pointer transition ${
                            selectedLeads.includes(lead._id)
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={selectedLeads.includes(lead._id)}
                              onChange={() => {}}
                              className="mt-1 w-5 h-5 cursor-pointer"
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">{lead.fullName}</p>
                              <p className="text-sm text-gray-600">{lead.email}</p>
                              {lead.phone && (
                                <p className="text-sm text-gray-500">{lead.phone}</p>
                              )}
                              {lead.company && (
                                <p className="text-sm text-gray-500">🏢 {lead.company}</p>
                              )}
                              {lead.status && (
                                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  {lead.status}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* 🔥 NEW: PAGINATION CONTROLS */}
                  {allLeads.length > 0 && (
                    <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-200">
                      <button
                        disabled={bulkLeadsPage === 1}
                        onClick={() => handleBulkLeadsPageChange(bulkLeadsPage - 1)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-600 transition flex items-center gap-2"
                      >
                        <span>←</span> Previous
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Page</span>
                        <span className="font-bold text-purple-600 text-lg">{bulkLeadsPage}</span>
                        <span className="text-sm text-gray-600">of {bulkLeadsTotalPages}</span>
                      </div>

                      <button
                        disabled={bulkLeadsPage === bulkLeadsTotalPages}
                        onClick={() => handleBulkLeadsPageChange(bulkLeadsPage + 1)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-600 transition flex items-center gap-2"
                      >
                        Next <span>→</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* ASSIGNMENT PANEL */}
                <div>
                  <div className="sticky top-0">
                    <div className="bg-purple-100 p-4 rounded-lg mb-4">
                      <p className="text-sm text-gray-600">Selected Leads</p>
                      <p className="text-4xl font-bold text-purple-600">{selectedLeads.length}</p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Choose User to Assign ({availableUsers.length} available)
                      </label>
                      {loadingUsers ? (
                        <div className="flex justify-center items-center p-4">
                          <Loader2 className="animate-spin text-purple-600" size={24} />
                        </div>
                      ) : (
                        <select
                          value={selectedAssociate}
                          onChange={(e) => setSelectedAssociate(e.target.value)}
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        >
                          <option value="">-- Select User --</option>
                          {availableUsers.map((user) => (
                            <option key={user._id} value={user._id}>
                              {user.name} ({user.email}) - {user.role}
                            </option>
                          ))}
                        </select>
                      )}
                      {!loadingUsers && availableUsers.length === 0 && (
                        <p className="text-sm text-red-600 mt-2">
                          ⚠️ No users available for assignment
                        </p>
                      )}
                    </div>

                    {selectedLeads.length > 0 && selectedAssociate && (
                      <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Ready to assign:</p>
                        <p className="text-sm">{selectedLeads.length} leads → <strong>{selectedAssociateName}</strong></p>
                      </div>
                    )}

                    <button
                      onClick={handleBulkAssign}
                      disabled={!selectedAssociate || selectedLeads.length === 0 || loading}
                      className={`w-full py-3 rounded-lg font-bold transition mb-3 ${
                        !selectedAssociate || selectedLeads.length === 0 || loading
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin" size={20} />
                          Assigning...
                        </span>
                      ) : (
                        `Assign ${selectedLeads.length} Leads`
                      )}
                    </button>

                    {selectedLeads.length > 0 && (
                      <button
                        onClick={() => setSelectedLeads([])}
                        className="w-full mt-3 py-2 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Clear Selection
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, gradient, onClick, onHover, onLeave, isHovering }) => (
  <div
    onClick={onClick}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    className={`bg-gradient-to-br ${gradient} p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200 relative`}
  >
    {isHovering && (
      <div className="absolute inset-0 bg-black/10 rounded-xl flex items-center justify-center">
        <Loader2 className="animate-spin text-white" size={32} />
      </div>
    )}
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-semibold text-gray-700 uppercase">{title}</p>
      {icon}
    </div>
    <p className="text-4xl font-bold text-gray-800">{value.toLocaleString()}</p>
  </div>
);

export default AdminDashboard;