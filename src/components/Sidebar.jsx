// import { Link } from "react-router-dom";
// import LogoutButton from "./LogoutButton";

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-gray-800 h-screen text-white flex flex-col">
//       <h2 className="text-xl font-bold p-4">Admin Panel</h2>
//       <nav className="flex-grow">
//         <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
//         <Link to="/users" className="block px-4 py-2 hover:bg-gray-700">Users</Link>
//         <Link to="/events" className="block px-4 py-2 hover:bg-gray-700">Events</Link>
//         <Link to="/services" className="block px-4 py-2 hover:bg-gray-700">Services</Link>
//       </nav>
//       <div className="p-4">
//         <LogoutButton />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;





import { Link } from "react-router-dom";
import { Dashboard, People, Business, BookOnline} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
      <ul className="flex-grow">
        <li className="mb-4">
          <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-700">
            <Dashboard /> Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="flex items-center gap-2 p-2 hover:bg-gray-700">
            <People /> Users
          </Link>
        </li>
        {/* <li className="mb-4">
          <Link to="/events" className="flex items-center gap-2 p-2 hover:bg-gray-700">
            <Event /> Events
          </Link>
        </li> */}
        <li className="mb-4">
          <Link to="/services" className="flex items-center gap-2 p-2 hover:bg-gray-700">
            <Business /> Services
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/booking" className="flex items-center gap-2 p-2 hover:bg-gray-700">
            <BookOnline /> Booking
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-gray-700">
          <AccountCircleIcon /> Profile
          </Link>
        </li>
      </ul>
      <div className="p-2">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
