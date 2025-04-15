import axios from "axios";
const API_URL = "https://backend-999h.onrender.com/admin";
const API_URL2 = "https://backend-999h.onrender.com/auth";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MzMxNDUzOCwiZXhwIjoxNzQzMzU3NzM4fQ.NiqGrWp8NQd24_SyITLZyfukyS6TjUWHCOeYDp5jS3E"

// const API_URL = "http://localhost:5000/api/admin"; // Update with your backend URL

export const getUsers = async (token) => {
  return axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getServices = async (token) => {
  return axios.get(`${API_URL}/services`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const adminLogin = async (email, password) => {
  return axios.post(`${API_URL2}/login`, { email, password });
};

// Approve Service Provider
export const approveServiceProvider = async (userId, token) => {
  return await axios.put(`${API_URL}/approve-service-provider/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//  Reject Service Provider
export const rejectServiceProvider = async (userId, token) => {
  return await axios.put(`${API_URL}/reject-service-provider/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//get bookings
export const getBookings = async (token) => {
  return axios.get(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Approve Booking
export const approveBooking = async (bookingId, token) => {
  return await axios.put(
    `${API_URL}/approve-booking/${bookingId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Reject Booking
export const rejectBooking = async (bookingId, token) => {
  return await axios.put(
    `${API_URL}/reject-booking/${bookingId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};




// Delete User
// export const deleteUser = async (userId, token) => {
//   return await axios.delete(`${API_URL}/users/${userId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };


