import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  Settings,
  Activity,
  RefreshCw,
  Home,
  Search,
  X,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../config/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

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

  /* ================= AUTH CHECK ================= */
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

  /* ================= FETCH USERS + LEADS ================= */
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

  /* ================= DASHBOARD SUMMARY ================= */
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

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  /* ================= MODAL ================= */
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
    <div className="min-h-screen bg-slate-100 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6 flex gap-2">
          <Settings /> Admin Panel
        </h2>

        <ul className="space-y-3">
          <li
            onClick={() => navigate("/")}
            className="cursor-pointer flex gap-2"
          >
            <Home /> Home
          </li>
          <li className="flex gap-2 text-blue-600 font-semibold">
            <Activity /> Dashboard
          </li>
          <li
            onClick={logout}
            className="cursor-pointer flex gap-2 text-red-600"
          >
            <LogOut /> Logout
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Welcome back, {admin?.name} 👋
            </h1>
            <p className="text-gray-600">Admin dashboard overview</p>
          </div>

          <button
            onClick={() => {
              fetchDashboardData();
              fetchAllData();
            }}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow"
          >
            <RefreshCw size={18} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Users" value={dashboardData.totalUsers} onClick={() => openModal("users")} />
            <StatCard title="Total Leads" value={dashboardData.totalLeads} onClick={() => openModal("leads")} />
            <StatCard title="Pending Leads" value={dashboardData.pendingLeads} />
            <StatCard title="Completed Leads" value={dashboardData.completedLeads} />
            <StatCard title="Active Leads" value={dashboardData.activeLeads} />
          </div>
        )}
      </div>

      {/* ================= MODAL WITH SCROLL FIX ================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-4/5 max-h-[85vh] rounded-xl flex flex-col">
            {/* HEADER */}
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-xl font-bold">
                {modalType === "users" ? "All Users" : "All Leads"}
              </h2>
              <button onClick={closeModal}><X /></button>
            </div>

            {/* SEARCH */}
            <div className="p-4 border-b relative">
              <Search className="absolute left-6 top-6 text-gray-400" size={18} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="border pl-10 p-2 w-full rounded"
              />
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto p-4">
              {filteredData.map((item) => (
                <div key={item._id} className="border rounded-lg p-4 mb-3">
                  {modalType === "users" ? (
                    <>
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.email}</p>

                      <div className="flex gap-3 mt-2 text-sm">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">
                          {item.role}
                        </span>
                        <span
                          className={`px-2 py-1 rounded ${
                            item.isEmailVerified
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.isEmailVerified ? "Verified" : "Not Verified"}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Joined: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">{item.name || "No Name"}</p>
                      <p className="text-sm text-gray-600 flex gap-2 items-center">
                        <Mail size={14} /> {item.email}
                      </p>
                      {item.phone && (
                        <p className="text-sm flex gap-2 items-center">
                          <Phone size={14} /> {item.phone}
                        </p>
                      )}
                      {item.message && (
                        <p className="text-sm mt-2 bg-gray-50 p-2 rounded">
                          {item.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2 flex gap-1 items-center">
                        <Calendar size={12} />
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
  >
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-4xl font-bold text-gray-800">{value}</p>
  </div>
);

export default AdminDashboard;
