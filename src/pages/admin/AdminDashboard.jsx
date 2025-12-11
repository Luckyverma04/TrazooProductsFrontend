import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  Package,
  Settings,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  RefreshCw,
  Home
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalLeads: 0,
    totalEnquiries: 0,
    pendingLeads: 0,
    completedLeads: 0,
    activeLeads: 0,
  });

  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/auth");
      return;
    }
    setAdmin(user);
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Example API (replace with your own)
      const response = await axios.get(
        "http://localhost:5000/api/leads/dashboard/summary",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDashboardData({
        totalUsers: response.data.totalUsers || 0,
        totalLeads: response.data.totalLeads || 0,
        totalEnquiries: response.data.totalEnquiries || 0,
        pendingLeads: response.data.pendingLeads || 0,
        completedLeads: response.data.completedLeads || 0,
        activeLeads: response.data.activeLeads || 0,
      });

      // Example for recent leads
      // setRecentLeads(response.data.recentLeads || []);

    } catch (error) {
      console.error("Error loading dashboard:", error);
      if (error.response?.status === 401) logout();
    }

    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-2xl">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Panel
            </h2>
          </div>
        </div>

        <div className="p-6">
          <ul className="space-y-2">

            {/* Home Button in Sidebar */}
            <li
              className="text-gray-700 font-semibold flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-all hover:text-blue-600 group"
              onClick={() => navigate("/")}
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </li>

            <li className="text-gray-700 font-semibold flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-all hover:text-blue-600 group">
              <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Dashboard</span>
            </li>

            <li className="text-gray-700 font-semibold flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-all hover:text-blue-600 group">
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Manage Users</span>
            </li>

            <li className="text-gray-700 font-semibold flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-all hover:text-blue-600 group">
              <Package className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>All Leads</span>
            </li>

            <li className="text-gray-700 font-semibold flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-all hover:text-blue-600 group">
              <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Analytics</span>
            </li>

          </ul>

          {/* Logout */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <li
              className="text-red-600 font-semibold flex items-center gap-3 cursor-pointer hover:bg-red-50 p-3 rounded-lg transition-all list-none group"
              onClick={logout}
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </li>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Welcome back, {admin?.name || "Admin"} 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your business today.
            </p>
          </div>

          <div className="flex gap-3">

            {/* Home Button */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all 
              border border-gray-200 hover:border-green-300"
            >
              <Home className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-700">Home</span>
            </button>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all 
              border border-gray-200 hover:border-blue-300"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="font-semibold">Refresh</span>
            </button>

          </div>

        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              
              {/* Total Users */}
              <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500">
                <div className="flex justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm">Total Users</h3>
                <p className="text-3xl font-bold">{dashboardData.totalUsers}</p>
              </div>

              {/* Total Leads */}
              <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-purple-500">
                <div className="flex justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm">Total Leads</h3>
                <p className="text-3xl font-bold">{dashboardData.totalLeads}</p>
              </div>

              {/* Total Enquiries */}
              <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-indigo-500">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-gray-600 text-sm mt-4">Total Enquiries</h3>
                <p className="text-3xl font-bold">{dashboardData.totalEnquiries}</p>
              </div>

            </div>

            {/* Recent Leads Placeholder */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="font-bold text-xl mb-4">Recent Leads</h2>
              <p className="text-gray-500">No recent leads yet</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
