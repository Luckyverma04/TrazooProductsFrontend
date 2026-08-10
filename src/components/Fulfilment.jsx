import {
  Truck,
  CheckCircle2,
  Clock,
  PackageX,
  TriangleAlert,
  Search,
  SlidersHorizontal,
  MoreVertical,
} from "lucide-react";

import Navbar from "./Navbar";
import Footer from "./Footer";

// ================= STATIC DATA (swap for API data later) =================
// TODO: replace with GET /api/shipments/summary
const summaryStats = [
  {
    label: "Active Shipments",
    value: "1,248",
    icon: Truck,
    tone: "default",
  },
  {
    label: "Delivered",
    value: "1,116",
    icon: CheckCircle2,
    tone: "default",
  },
  {
    label: "In Transit",
    value: "82",
    icon: Clock,
    tone: "default",
  },
  {
    label: "Out for Delivery",
    value: "39",
    icon: PackageX,
    tone: "warning",
  },
  {
    label: "Attention Required",
    value: "11",
    icon: TriangleAlert,
    tone: "danger",
  },
];

// TODO: replace with GET /api/shipments?page=1
const recentShipments = [
  {
    id: "#TRZ-7721A",
    client: "Client 01",
    subtitle: "Enterprise Kit",
    destination: "Bengaluru, KA",
    status: "Delivery Exception",
    estDelivery: "Pending Review",
    action: "resolve",
  },
  {
    id: "#TRZ-7722B",
    client: "Client 02",
    subtitle: "Onboarding Swag",
    destination: "Mumbai, MH",
    status: "Out for Delivery",
    estDelivery: "Today, 2:00 PM",
    action: "menu",
  },
  {
    id: "#TRZ-7723C",
    client: "Client 03",
    subtitle: "VIP Gifting",
    destination: "Chennai, TN",
    status: "In Transit",
    estDelivery: "Oct 12, 2024",
    action: "menu",
  },
  {
    id: "#TRZ-7724D",
    client: "Client 04",
    subtitle: "Holiday Batch",
    destination: "Kolkata, WB",
    status: "Delivered",
    estDelivery: "Oct 10, 2024",
    action: "menu",
  },
];

const totalEntries = 1248;
const shownStart = 1;
const shownEnd = 4;

// ================= STATUS BADGE STYLES =================
const statusStyles = {
  "Delivery Exception": "bg-[#FBE4DD] text-[#C93E05]",
  "Out for Delivery": "bg-[#FCE9DB] text-[#B45B0C]",
  "In Transit": "bg-[#E1EAF7] text-[#2E5FA3]",
  Delivered: "bg-[#DFF0E1] text-[#2E7D42]",
};

// ================= STAT CARD TONE STYLES =================
const toneStyles = {
  default: "bg-white border-[#DED8D2]",
  warning: "bg-[#FCE9DB] border-[#F3C79B]",
  danger: "bg-[#FBDCDC] border-[#F0AFAF]",
};

const Fulfilment = () => {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
    

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">

        {/* ================= HEADER ================= */}
        <div className="max-w-2xl mb-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] leading-tight mb-4">
            Dispatch shouldn&apos;t mean losing visibility.
          </h1>
          <p className="text-[#6E6A67] text-base leading-relaxed">
            Real-time tracking, proactive alerts, and comprehensive shipment
            analytics—all grounded in enterprise-grade reliability. Seamless
            Pan-India coverage across 12,000+ PIN codes.
          </p>
        </div>

        {/* ================= SUMMARY STATS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {summaryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`
                  rounded-xl
                  border
                  p-5
                  ${toneStyles[stat.tone]}
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-[#6E6A67]">
                    {stat.label}
                  </span>
                  <Icon size={16} className="text-[#A9A29D]" />
                </div>
                <div className="text-3xl font-extrabold text-[#1A1A1A]">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= RECENT SHIPMENTS ================= */}
        <div className="bg-white border border-[#DED8D2] rounded-xl overflow-hidden">

          {/* TABLE HEADER BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-[#DED8D2]">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                Recent Shipments
              </h2>
              <span className="text-[11px] font-medium text-[#A9A29D] bg-[#F7F2EC] px-2 py-1 rounded-md">
                Illustrative tracking view
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A9A29D]"
                />
                <input
                  type="text"
                  placeholder="Search ID or Recipient"
                  className="
                    pl-9 pr-4 py-2
                    text-sm
                    border border-[#DED8D2]
                    rounded-lg
                    text-[#222222]
                    placeholder:text-[#A9A29D]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#DF4607]/30
                  "
                />
              </div>

              <button
                className="
                  flex items-center gap-2
                  px-4 py-2
                  text-sm font-medium
                  text-[#222222]
                  border border-[#DED8D2]
                  rounded-lg
                  hover:bg-[#F7F2EC]
                  transition-colors
                "
              >
                <SlidersHorizontal size={14} />
                Filter
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-[#A9A29D] border-b border-[#DED8D2]">
                  <th className="px-6 py-3 font-semibold">Shipment ID</th>
                  <th className="px-6 py-3 font-semibold">Recipient</th>
                  <th className="px-6 py-3 font-semibold">Destination</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Est. Delivery</th>
                  <th className="px-6 py-3 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b border-[#F0EBE4] last:border-b-0 hover:bg-[#FBF8F3] transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-[#1A1A1A]">
                      {shipment.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-[#2E5FA3] font-medium">
                        {shipment.client}
                      </div>
                      <div className="text-xs text-[#A9A29D]">
                        {shipment.subtitle}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[#222222]">
                      {shipment.destination}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`
                          inline-flex items-center
                          px-2.5 py-1
                          rounded-full
                          text-xs font-medium
                          ${statusStyles[shipment.status]}
                        `}
                      >
                        {shipment.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-[#222222]">
                      {shipment.estDelivery}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {shipment.action === "resolve" ? (
                        <button className="text-sm font-medium text-[#DF4607] hover:text-[#C93E05] transition-colors">
                          Resolve
                        </button>
                      ) : (
                        <button className="text-[#A9A29D] hover:text-[#222222] transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-[#DED8D2]">
            <span className="text-xs text-[#A9A29D]">
              Showing {shownStart} to {shownEnd} of{" "}
              {totalEntries.toLocaleString("en-IN")} entries
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled
                className="
                  px-3 py-1.5
                  text-xs font-medium
                  text-[#A9A29D]
                  border border-[#DED8D2]
                  rounded-md
                  cursor-not-allowed
                "
              >
                Prev
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`
                    px-3 py-1.5
                    text-xs font-medium
                    rounded-md
                    border
                    transition-colors
                    ${
                      page === 1
                        ? "bg-[#DF4607] text-white border-[#DF4607]"
                        : "text-[#222222] border-[#DED8D2] hover:bg-[#F7F2EC]"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button
                className="
                  px-3 py-1.5
                  text-xs font-medium
                  text-[#222222]
                  border border-[#DED8D2]
                  rounded-md
                  hover:bg-[#F7F2EC]
                  transition-colors
                "
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Fulfilment;