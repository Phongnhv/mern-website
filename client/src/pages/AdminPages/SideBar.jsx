import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <ul className="space-y-3">
        <li>
          <Link
            to="/admin/userList"
            className={`block py-2 pl-3 rounded-lg ${
              location.pathname === "/admin/userList"
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >
            Users Details
          </Link>
        </li>
        <li>
          <Link
            to="/admin/estate-list"
            className={`block py-2 pl-3 rounded-lg ${
              location.pathname === "/admin/estate-list"
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >
            Estates Details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
