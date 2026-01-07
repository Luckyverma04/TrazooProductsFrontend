import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../config/api";

const AssociateDashboard = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchMyLeads = async () => {
      try {
        const res = await API.get("/api/enquiry/my/leads");
        setCount(res.data.count);
      } catch (err) {
        console.error(err);
        setError("Failed to load leads");
      } finally {
        setLoading(false);
      }
    };

    fetchMyLeads();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
      {/* Mobile-Optimized Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <svg className="w-5 h-5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Associate Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Welcome back!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        {/* Stats Card - Mobile First */}
        <div className="grid grid-cols-1 gap-4">
          {/* Primary Lead Card */}
          <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-violet-100 mb-2">Total Assigned Leads</p>
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Loading...</span>
                  </div>
                ) : error ? (
                  <p className="text-red-200 text-sm">{error}</p>
                ) : (
                  <p className="text-5xl sm:text-6xl font-bold">{count}</p>
                )}
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-violet-100">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Active assignments</span>
            </div>
          </div>

          {/* Secondary Cards Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
              <div className="bg-gradient-to-br from-fuchsia-100 to-pink-100 p-3 rounded-lg w-fit mb-3">
                <svg className="w-6 h-6 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs text-gray-600 mb-1">Quick</p>
              <p className="text-sm font-bold text-gray-900">Actions</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-lg w-fit mb-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-xs text-gray-600 mb-1">Performance</p>
              <p className="text-sm font-bold text-gray-900">Coming soon</p>
            </div>
          </div>
        </div>

        {/* CTA Button - Mobile Optimized */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-center sm:text-left space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Ready to work?</h2>
              <p className="text-sm sm:text-base text-gray-600">View and manage all your assigned leads</p>
            </div>
            <Link
              to="/associate/leads"
              className="flex items-center justify-center w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <span>View My Leads</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Quick Tip - Mobile Friendly */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 bg-violet-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-violet-900 mb-1">Quick Tip</h3>
              <p className="text-xs sm:text-sm text-violet-700">Keep your leads updated regularly to ensure better conversion rates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociateDashboard;