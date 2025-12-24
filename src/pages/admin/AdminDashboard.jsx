import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  Settings,
  Activity,
  RefreshCw,
  Home,
  Check,
  Clock,
  Search,
  X,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
  MessageSquare,
  Shield
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
    totalEnquiries: 0,
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

  /* ================= FETCH ALL DATA ================= */
  const fetchAllData = async () => {
    try {
      const usersRes = await API.get("/api/auth/all");
      setAllUsers(Array.isArray(usersRes.data) ? usersRes.data : []);

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

      console.log("DASHBOARD SUMMARY:", res.data);

      setDashboardData({
        totalUsers: res.data.totalUsers ?? 0,
        totalLeads: res.data.totalLeads ?? 0,
        totalEnquiries: res.data.totalEnquiries ?? 0,
        pendingLeads: res.data.pendingLeads ?? 0,
        completedLeads: res.data.completedLeads ?? 0,
        activeLeads: res.data.activeLeads ?? 0,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
      if (error.response?.status === 401) logout();
    }
    setLoading(false);
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  /* ================= MODAL ================= */
  const handleCardClick = (type) => {
    setModalType(type);
    setModalOpen(true);
    setSearchTerm("");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSearchTerm("");
  };

  const getFilteredData = () => {
    const data = modalType === "users" ? allUsers : allLeads;
    if (!searchTerm) return data;

    const q = searchTerm.toLowerCase();
    return data.filter((item) =>
      modalType === "users"
        ? item.name?.toLowerCase().includes(q) ||
          item.email?.toLowerCase().includes(q) ||
          item.role?.toLowerCase().includes(q)
        : item.name?.toLowerCase().includes(q) ||
          item.email?.toLowerCase().includes(q) ||
          item.message?.toLowerCase().includes(q)
    );
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-xl">
        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xl font-bold">
          Admin Panel
        </div>
        <ul className="p-4 space-y-2">
          <li onClick={() => navigate("/")} className="cursor-pointer flex gap-2">
            <Home /> Home
          </li>
          <li className="text-blue-600 font-semibold flex gap-2">
            <Activity /> Dashboard
          </li>
          <li onClick={logout} className="cursor-pointer text-red-600 flex gap-2">
            <LogOut /> Logout
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              Welcome back, {admin?.name} 👋
            </h1>
            <p className="text-gray-600">Here’s what’s happening today</p>
          </div>

          <button
            onClick={() => {
              fetchDashboardData();
              fetchAllData();
            }}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Users" value={dashboardData.totalUsers} onClick={() => handleCardClick("users")} />
            <StatCard title="Total Leads" value={dashboardData.totalLeads} onClick={() => handleCardClick("leads")} />
            <StatCard title="Pending Leads" value={dashboardData.pendingLeads} />
            <StatCard title="Completed Leads" value={dashboardData.completedLeads} />
            <StatCard title="Active Leads" value={dashboardData.activeLeads} />
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-3/4 h-3/4 rounded-xl p-6 overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                {modalType === "users" ? "All Users" : "All Leads"}
              </h2>
              <button onClick={closeModal}><X /></button>
            </div>

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="border p-2 w-full mb-4"
            />

            {filteredData.map((item) => (
              <div key={item._id} className="border p-3 rounded mb-2">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">{item.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow cursor-pointer"
  >
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;
