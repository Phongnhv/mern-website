import React, { useState, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../../redux/user/userSlice";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { FaBuilding, FaHome, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const SidebarItem = ({ icon, text, to }) => (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          location.pathname === to
            ? "bg-gray-700 text-white"
            : "hover:bg-gray-600 text-gray-300"
        }
      `}
    >
      <Link to={to} className="flex items-center w-full">
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
    </li>
  );

  return (
    <aside className="h-[90vh]">
      <nav className="h-[90vh] flex flex-col bg-gray-800 text-white shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <span className="text-slate-100 font-bold">Group35</span>
            <span className="text-slate-300 font-bold">Estate</span>
          </span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">
          <SidebarItem icon={<FaHome />} text="Home" to="/" />
          <SidebarItem
            icon={<FaUsers />}
            text="Users Details"
            to="/admin/user-list"
          />
          <SidebarItem
            icon={<FaBuilding />}
            text="Estates Details"
            to="/admin/estate-list"
          />
          <SidebarItem
            icon={<ImProfile />}
            text="Profile"
            to="/admin/profile"
          />
          <li
            className="relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group hover:bg-gray-600  text-gray-300"
            onClick={handleSignOut}
          >
            <FaSignOutAlt/>
            <span
              className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <p>Sign Out</p>
            </span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
