import React, { useState, useEffect } from "react";
import {
    approveBooking,
    getBookings,
    rejectBooking,
} from "../api/adminApi"; // Adjust the path if needed

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const response = await getBookings(token);
            console.log("Bookings:", response.data);
            setBookings(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleApprove = async (id) => {
        try {
            setProcessingId(id);
            const token = localStorage.getItem("adminToken");
            await approveBooking(id, token);
            setBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status: "approved" } : b))
            );
        } catch (error) {
            console.error("Approval failed", error);
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (id) => {
        try {
            setProcessingId(id);
            const token = localStorage.getItem("adminToken");
            await rejectBooking(id, token);
            setBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status: "rejected" } : b))
            );
        } catch (error) {
            console.error("Rejection failed", error);
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return <p className="text-center mt-5 text-lg font-semibold text-gray-600 animate-pulse">Loading bookings...</p>;
    }

    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-6">Bookings</h1>
            {bookings.length === 0 ? (
                <p className="text-center text-lg text-gray-500">No bookings available.</p>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                            <tr>
                                <th className="border border-gray-300 px-6 py-3 text-left">Sr. No.</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Event</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Service</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Status</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Start Time</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">End Time</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Total Price</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {bookings.map((booking, index) => (
                                <tr
                                    key={booking.id || index}
                                    className="hover:bg-gray-100 transition duration-200"
                                >
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{booking.event?.name || booking.eventId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{booking.service?.name || booking.serviceId}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                                                booking.status === "pending"
                                                    ? "bg-yellow-500"
                                                    : booking.status === "approved"
                                                    ? "bg-green-500"
                                                    : booking.status === "accepted"
                                                    ? "bg-blue-500"
                                                    : "bg-red-500"
                                            }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        {new Date(booking.startTime).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        {new Date(booking.endTime).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        ₹{booking.totalPrice}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                        <button
                                            className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition duration-200 ${
                                                booking.status === "pending"
                                                    ? "bg-green-500 hover:bg-green-600"
                                                    : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                            onClick={() => handleApprove(booking.id)}
                                            disabled={booking.status !== "pending" || processingId === booking.id}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition duration-200 ${
                                                booking.status === "pending"
                                                    ? "bg-red-500 hover:bg-red-600"
                                                    : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                            onClick={() => handleReject(booking.id)}
                                            disabled={booking.status !== "pending" || processingId === booking.id}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Booking;
