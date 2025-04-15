import { useEffect, useState } from "react";
import { getUsers, approveServiceProvider, rejectServiceProvider } from "../api/adminApi";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const response = await getUsers(token);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  // Function to handle approval
  const handleApprove = async (userId) => {
    const token = localStorage.getItem("adminToken");
    try {
      await approveServiceProvider(userId, token);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: "approved" } : user
        )
      );
    } catch (error) {
      console.error("Error approving service provider", error);
    }
  };

  // Function to handle rejection
  const handleReject = async (userId) => {
    const token = localStorage.getItem("adminToken");
    try {
      await rejectServiceProvider(userId, token);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: "rejected" } : user
        )
      );
    } catch (error) {
      console.error("Error rejecting service provider", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        User Management
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="border p-5 text-center text-gray-500 text-lg"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="text-center hover:bg-gray-50 transition duration-200"
                >
                  <td className="border p-3 text-gray-700 font-medium">
                    {user.name}
                  </td>
                  <td className="border p-3 text-gray-700">{user.email}</td>
                  <td className="border p-3 text-gray-700 capitalize">
                    {user.role.replace("_", " ")}
                  </td>
                  <td className="border p-3 text-gray-700 capitalize">
                  {user.status || "Pending"}
                  </td>
                  <td className="border p-3">
                    {user.role === "service_provider" && (
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleApprove(user.id)}
                          disabled={user.status === "approved"}
                          className={`px-4 py-2 rounded-lg shadow-md font-semibold transition ${
                            user.status === "approved"
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.id)}
                          disabled={user.status === "rejected"}
                          className={`px-4 py-2 rounded-lg shadow-md font-semibold transition ${
                            user.status === "rejected"
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
