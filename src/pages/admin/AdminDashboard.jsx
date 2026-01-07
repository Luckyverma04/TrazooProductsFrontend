import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Settings,
  Activity,
  RefreshCw,
  Home,
  Search,
  X,
  Mail,
  Phone,
  Calendar,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../config/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [allLeads, setAllLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalLeads: 0,
    pendingLeads: 0,
    completedLeads: 0,
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
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const usersRes = await API.get("/api/auth/all");
      setAllUsers(usersRes.data || []);

      const leadsRes = await API.get("/api/enquiry");
      setAllLeads(leadsRes.data.enquiries || []);
    } catch (error) {
      console.error("Fetch all data error:", error);
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
        completedLeads: res.data.completedLeads ?? 0,
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
  };

  const closeModal = () => {
    setModalOpen(false);
    setSearchTerm("");
  };

  const filteredData = (modalType === "users" ? allUsers : allLeads).filter(
    (item) => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        item.name?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.role?.toLowerCase().includes(q) ||
        item.message?.toLowerCase().includes(q)
      );
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
              <Settings className="text-cyan-600" size={24} />
              Admin Panel
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <ul className="p-4 space-y-2">
          <li
            onClick={() => {
              navigate("/");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-cyan-50 hover:to-teal-50 transition-all duration-200 text-gray-700 hover:text-cyan-700"
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-700 font-semibold">
            <Activity size={20} />
            <span>Dashboard</span>
          </li>
          <li
            onClick={logout}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 text-gray-700 hover:text-red-600"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-md sticky top-0 z-10 px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => {
              fetchDashboardData();
              fetchAllData();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Welcome back, {admin?.name} 👋
              </h1>
              <p className="text-gray-600 mt-1">Admin dashboard overview</p>
            </div>

            <button
              onClick={() => {
                fetchDashboardData();
                fetchAllData();
              }}
              className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
            >
              <RefreshCw size={18} className="text-cyan-600" />
              <span className="font-medium text-gray-700">Refresh</span>
            </button>
          </div>

          {/* Mobile Welcome */}
          <div className="lg:hidden mb-6 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl p-5 text-white shadow-lg">
            <p className="text-sm font-medium opacity-90 mb-1">Welcome back</p>
            <h2 className="text-2xl font-bold">{admin?.name} 👋</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <StatCard
                title="Total Users"
                value={dashboardData.totalUsers}
                onClick={() => openModal("users")}
                gradient="from-cyan-500 to-blue-500"
                icon="👥"
              />
              <StatCard
                title="Total Leads"
                value={dashboardData.totalLeads}
                onClick={() => openModal("leads")}
                gradient="from-teal-500 to-emerald-500"
                icon="📊"
              />
              <StatCard
                title="Pending Leads"
                value={dashboardData.pendingLeads}
                gradient="from-amber-500 to-orange-500"
                icon="⏳"
              />
              <StatCard
                title="Completed Leads"
                value={dashboardData.completedLeads}
                gradient="from-green-500 to-emerald-500"
                icon="✅"
              />
              <StatCard
                title="Active Leads"
                value={dashboardData.activeLeads}
                gradient="from-purple-500 to-pink-500"
                icon="🔥"
              />
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:w-11/12 lg:w-4/5 max-w-4xl h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl">
            {/* HEADER */}
            <div className="flex justify-between items-center p-5 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-cyan-50 to-teal-50">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {modalType === "users" ? "All Users" : "All Leads"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* SEARCH */}
            <div className="p-4 sm:p-5 border-b border-gray-100 bg-white">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="border border-gray-200 pl-12 pr-4 py-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-base"
                />
              </div>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              <div className="space-y-3">
                {filteredData.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white hover:shadow-md transition-shadow"
                  >
                    {modalType === "users" ? (
                      <>
                        <p className="font-semibold text-lg text-gray-900 mb-2">{item.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <Mail size={14} />
                          <span className="break-all">{item.email}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
                            {item.role}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.isEmailVerified
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.isEmailVerified ? "Verified" : "Not Verified"}
                          </span>
                        </div>

                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar size={12} />
                          Joined: {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-lg text-gray-900 mb-2">{item.name || "No Name"}</p>
                        <div className="space-y-2 mb-3">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Mail size={14} className="text-gray-400 flex-shrink-0" />
                            <span className="break-all">{item.email}</span>
                          </p>
                          {item.phone && (
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Phone size={14} className="text-gray-400 flex-shrink-0" />
                              <span>{item.phone}</span>
                            </p>
                          )}
                        </div>
                        {item.message && (
                          <p className="text-sm bg-gray-50 p-3 rounded-lg mb-3 text-gray-700">
                            {item.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </>
                    )}
                  </div>
                ))}
                {filteredData.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No results found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, onClick, gradient, icon }) => (
  <div
    onClick={onClick}
    className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-white`}
  >
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-white/90 text-sm font-medium">{title}</h3>
      <span className="text-3xl">{icon}</span>
    </div>
    <p className="text-4xl sm:text-5xl font-bold">{value}</p>
    <div className="mt-3 text-xs text-white/80 flex items-center">
      <span>Tap to view details</span>
    </div>
  </div>
);

export default AdminDashboard;