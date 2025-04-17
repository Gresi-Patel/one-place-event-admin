import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [eventTrends, setEventTrends] = useState([]);
  const [bookingStatus, setBookingStatus] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  // Color scheme for statuses
  const COLORS = {
    accepted: "#ff8042",
    approved: "#ffc658",
    completed: "#82ca9d",
    confirmed: "#5583e1",
  };

  const COLOR_ARRAY = {
    accepted: COLORS.accepted,
    approved: COLORS.approved,
    completed: COLORS.completed,
    confirmed: COLORS.confirmed,
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const [statsRes, trendRes, bookingStatusRes, recentBookingRes] = await Promise.all([
          axios.get("http://localhost:5000/admin/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/admin/event-trends", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/admin/booking-status_summary", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/admin/recent-bookings", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        setStats(statsRes.data);
        setEventTrends(trendRes.data);
        setBookingStatus(bookingStatusRes.data);
        setRecentBookings(recentBookingRes.data);
        // console.log("recent:",recentBookingRes.data)
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, Admin 👋</h1>
        <div className="space-x-4 flex items-center">
          <span>{new Date().toDateString()}</span>
          <button className="relative bg-white p-2 rounded-full shadow">
            🔔
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Events" value={stats.events} bgColor="bg-blue-100" textColor="text-blue-900" />
        <Card title="Total Users" value={stats.users} bgColor="bg-green-100" textColor="text-green-900" />
        <Card title="Total Services" value={stats.services} bgColor="bg-yellow-100" textColor="text-yellow-900" />
        <Card title="Complete Bookings" value={stats.bookings} bgColor="bg-red-100" textColor="text-red-900" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Events per Month</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={eventTrends}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Booking Status</h2>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={bookingStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label
                >
                  {bookingStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLOR_ARRAY[entry.name] || "#ccc"} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.completed }}></span>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.confirmed }}></span>
                <span>Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.accepted }}></span>
                <span>Accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.approved }}></span>
                <span>Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-6 rounded-xl shadow-md overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Booking ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Service</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking, idx) => (
              <tr key={idx}>
                <td className="p-2">#{booking.id.slice(-4)}</td>
                <td className="p-2">{booking.event?.manager?.name || "N/A"}</td>
                <td className="p-2">{booking.service?.name || "N/A"}</td>
                <td
                  className={`p-2 ${booking.status === 'pending'
                      ? 'text-yellow-600'
                      : booking.status === 'confirmed'
                        ? 'text-blue-600'
                        : booking.status === 'accepted'
                          ? 'text-orange-600'
                          : 'text-green-600'
                    }`}
                >
                  {booking.status}
                </td>
                <td className="p-2">{new Date(booking.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
