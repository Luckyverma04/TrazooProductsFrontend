import { useNavigate } from "react-router-dom";
import { Users, FileText } from "lucide-react";

const QuickActions = ({ openUsers, openLeads }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={openUsers}
          className="flex items-center gap-3 p-4 border-2 border-cyan-200 rounded-lg hover:bg-cyan-50 transition"
        >
          <Users className="text-cyan-600" size={24} />
          <span className="font-semibold">View All Users</span>
        </button>

        <button
          onClick={openLeads}
          className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition"
        >
          <FileText className="text-green-600" size={24} />
          <span className="font-semibold">View All Leads</span>
        </button>

        {/* NEW */}
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-3 p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition"
        >
          📦 <span className="font-semibold">Manage Products</span>
        </button>

        <button
          onClick={() => navigate("/admin/kit-enquiries")}
          className="flex items-center gap-3 p-4 border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 transition"
        >
          🧾 <span className="font-semibold">Kit Enquiries</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
