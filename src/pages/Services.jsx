import { useEffect, useState } from "react";
import { getServices } from "../api/adminApi";

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const response = await getServices(token);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Service Management</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search services..."
          className="p-2 border rounded-lg w-1/3 shadow-sm focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="border p-3">Service Name</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Provider</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length === 0 ? (
              <tr>
                <td colSpan="4" className="border p-5 text-center text-gray-500 text-lg">
                  No services found
                </td>
              </tr>
            ) : (
              filteredServices.map((service) => (
                <tr key={service.id} className="text-center hover:bg-gray-50 transition duration-200">
                  <td className="border p-3 text-gray-700 font-medium">{service.name}</td>
                  <td className="border p-3 text-gray-700">{service.description}</td>
                  <td className="border p-3 text-gray-700">₹{service.price}</td>
                  <td className="border p-3 text-gray-700">{service.provider.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
