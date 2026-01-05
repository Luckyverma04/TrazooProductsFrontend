import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../config/api";

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [callStatus, setCallStatus] = useState("");
  const [finalStatus, setFinalStatus] = useState("");
  const [comment, setComment] = useState("");
  const [commType, setCommType] = useState("CALL");
  const [commMsg, setCommMsg] = useState("");

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    const res = await API.get(`/api/enquiry/${id}`);
    setLead(res.data.enquiry);
  };

  // 🔹 STATUS UPDATE
  const updateStatus = async () => {
    if (!callStatus || !finalStatus) {
      alert("Select call status and final status");
      return;
    }

    await API.put(`/api/enquiry/${id}/status`, {
      callStatus,
      finalStatus,
      comment,
    });

    alert("Status updated");
    fetchLead();
    setComment("");
  };

  // 🔹 ADD COMMUNICATION
  const addCommunication = async () => {
    if (!commMsg) {
      alert("Message required");
      return;
    }

    await API.post(`/api/enquiry/${id}/communication`, {
      type: commType,
      message: commMsg,
    });

    alert("Communication logged");
    setCommMsg("");
    fetchLead();
  };

  if (!lead) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading lead details...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      'IN_PROCESS': 'bg-blue-100 text-blue-800 border-blue-200',
      'NOT_INTERESTED': 'bg-red-100 text-red-800 border-red-200',
      'CONVERTED': 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate("/associate/leads")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Leads</span>
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{lead.fullName}</h1>
                <p className="text-sm text-gray-500 mt-1">Lead Details & Management</p>
              </div>
            </div>
            
            {lead.finalStatus && (
              <div className={`mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(lead.finalStatus)}`}>
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>{lead.finalStatus.replace('_', ' ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Info & Actions */}
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
              </div>
            </div>

            {/* Add Communication */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Add Communication
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Communication Type</label>
                  <select
                    value={commType}
                    onChange={(e) => setCommType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="CALL">📞 Call</option>
                    <option value="WHATSAPP">💬 WhatsApp</option>
                    <option value="EMAIL">📧 Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    placeholder="Enter your message or notes..."
                    value={commMsg}
                    onChange={(e) => setCommMsg(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={addCommunication}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Log Communication
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Status & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Update Lead Status */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Update Lead Status
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Call Status</label>
                    <select
                      value={callStatus}
                      onChange={(e) => setCallStatus(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Select Call Status</option>
                      <option value="CONNECTED">✅ Connected</option>
                      <option value="DNP">📵 DNP (Did Not Pick)</option>
                      <option value="WRONG_NUMBER">❌ Wrong Number</option>
                      <option value="CALL_BACK">🔄 Call Back</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Final Status</label>
                    <select
                      value={finalStatus}
                      onChange={(e) => setFinalStatus(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Select Final Status</option>
                      <option value="IN_PROCESS">🔄 In Process</option>
                      <option value="NOT_INTERESTED">❌ Not Interested</option>
                      <option value="CONVERTED">✅ Converted</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                  <textarea
                    placeholder="Add any additional notes or comments..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={updateStatus}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Update Status
                </button>
              </div>
            </div>

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
                  <p className="text-sm text-gray-500 mt-1">Updates and communications will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lead.history.map((h, i) => (
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
                        {h.comment && <p className="text-sm text-gray-600 mt-1">{h.comment}</p>}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;