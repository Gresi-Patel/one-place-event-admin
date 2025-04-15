// import { useEffect, useState } from "react";
// import { getEvents } from "../api/adminApi";

// const Events = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const token = localStorage.getItem("adminToken");
//       try {
//         const response = await getEvents(token);
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Events</h2>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Event Name</th>
//             <th className="border p-2">Date</th>
//             <th className="border p-2">Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map((event) => (
//             <tr key={event.id} className="text-center">
//               <td className="border p-2">{event.name}</td>
//               <td className="border p-2">{new Date(event.date).toLocaleDateString()}</td>
//               <td className="border p-2">{event.address}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Events;
