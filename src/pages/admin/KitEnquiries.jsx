import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  Search,
  ArrowLeft,
  Loader2,
  Mail,
  Phone,
  Calendar,
  Package,
  User,
  Building2,
  MessageSquare,
  IndianRupee,
} from "lucide-react";
import API from "../../config/api";

const KitEnquiries = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    // Check admin authentication
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/auth");
      return;
    }
    fetchEnquiries();
  }, [navigate]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await API.get("/api/kit-enquiry");
      setEnquiries(response.data || []);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      alert("Failed to fetch enquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (enquiryId, newStatus) => {
    setUpdatingStatus(enquiryId);
    try {
      await API.patch(`/api/kit-enquiry/${enquiryId}/status`, {
        status: newStatus,
      });
      alert(`Enquiry marked as ${newStatus}!`);
      fetchEnquiries();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.phone?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || enquiry.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "contacted":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatBudget = (budget) => {
    if (!budget) return "Not specified";
    return budget;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-purple-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="p-2 hover:bg-white rounded-lg transition"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <ClipboardList className="text-pink-600" size={36} />
                Kit Enquiries
              </h1>
              <p className="text-gray-600 mt-1">
                Manage all gift kit enquiries from customers
              </p>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Enquiries</p>
            <p className="text-2xl font-bold text-pink-600">{enquiries.length}</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, company, or phone..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* ENQUIRIES LIST */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-pink-600" size={40} />
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <ClipboardList className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 text-lg">
              {searchTerm || filterStatus !== "all" 
                ? "No enquiries match your filters" 
                : "No enquiries found"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <User className="text-pink-600" size={20} />
                        {enquiry.customerName}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Mail size={16} />
                          {enquiry.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={16} />
                          {enquiry.phone}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                        enquiry.status
                      )}`}
                    >
                      {enquiry.status?.charAt(0).toUpperCase() +
                        enquiry.status?.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {enquiry.company && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <Building2 size={14} />
                          Company
                        </p>
                        <p className="font-semibold text-gray-800">
                          {enquiry.company}
                        </p>
                      </div>
                    )}
                    
                    {enquiry.kitType && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <Package size={14} />
                          Kit Type
                        </p>
                        <p className="font-semibold text-gray-800">
                          {enquiry.kitType}
                        </p>
                      </div>
                    )}
                    
                    {enquiry.quantity && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Quantity</p>
                        <p className="font-semibold text-gray-800">
                          {enquiry.quantity} units
                        </p>
                      </div>
                    )}
                    
                    {enquiry.budget && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <IndianRupee size={14} />
                          Budget
                        </p>
                        <p className="font-semibold text-gray-800">
                          {formatBudget(enquiry.budget)}
                        </p>
                      </div>
                    )}
                    
                    {enquiry.deliveryDate && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <Calendar size={14} />
                          Delivery Date
                        </p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(enquiry.deliveryDate)}
                        </p>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Enquiry Date</p>
                      <p className="font-semibold text-gray-800">
                        {formatDate(enquiry.createdAt)}
                      </p>
                    </div>
                  </div>

                  {enquiry.message && (
                    <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg mb-4">
                      <p className="text-xs text-gray-500 mb-1 font-semibold flex items-center gap-1">
                        <MessageSquare size={14} />
                        Message:
                      </p>
                      <p className="text-gray-700">{enquiry.message}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="flex-1 min-w-[150px] bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition font-semibold text-center"
                    >
                      Contact via Email
                    </a>
                    
                    {enquiry.status !== "contacted" && (
                      <button
                        onClick={() => handleStatusUpdate(enquiry._id, "contacted")}
                        disabled={updatingStatus === enquiry._id}
                        className="flex-1 min-w-[150px] bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition font-semibold disabled:opacity-50"
                      >
                        {updatingStatus === enquiry._id ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" size={16} />
                            Updating...
                          </span>
                        ) : (
                          "Mark as Contacted"
                        )}
                      </button>
                    )}
                    
                    {enquiry.status !== "completed" && (
                      <button
                        onClick={() => handleStatusUpdate(enquiry._id, "completed")}
                        disabled={updatingStatus === enquiry._id}
                        className="flex-1 min-w-[150px] bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition font-semibold disabled:opacity-50"
                      >
                        {updatingStatus === enquiry._id ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" size={16} />
                            Updating...
                          </span>
                        ) : (
                          "Mark as Completed"
                        )}
                      </button>
                    )}

                    {enquiry.status !== "cancelled" && enquiry.status !== "completed" && (
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to cancel this enquiry?")) {
                            handleStatusUpdate(enquiry._id, "cancelled");
                          }
                        }}
                        disabled={updatingStatus === enquiry._id}
                        className="flex-1 min-w-[150px] bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition font-semibold disabled:opacity-50"
                      >
                        Cancel Enquiry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KitEnquiries;