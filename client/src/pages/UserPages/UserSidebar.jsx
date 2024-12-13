import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {  
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/user/userSlice";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const UserSidebar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false); // State điều khiển việc mở/đóng menu con
  // Hàm toggle mở/đóng menu con
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
      dispatch(signOutUserFailure(data.message));
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-1/5 min-h-screen max-h-full bg-gray-800 text-white p-5 flex-col shadow-lg h-full fixed">
      <ul className="space-y-3">
        <li>
          <Link
            to="/admin" //chỉnh lại đường dẫn
            className={`font-bold text-lg flex py-2 rounded-lg ${
              location.pathname === "/admin"
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >
            Profile
          </Link>
        </li>
        <li>
          <button className="font-bold text-lg w-full text-left flex items-center justify-between" onClick={toggleMenu} >
            Post Management
          </button>
        </li>
        <li className = "font-bold text-lg">General </li>
        <li>
          <Link
            to="/admin/estate-list"
            className={`flex py-2 pl-3 rounded-lg ${
              location.pathname === "/admin/estate-list"
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >  Feedbacks
          </Link>
        </li>
        <li>
          <Link
            to="/admin/estate-list"
            className={`flex py-2 pl-3 rounded-lg ${
              location.pathname === "/admin/estate-list"
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >
            Reports
          </Link>
        </li>
        <li className = "font-bold text-lg">Maintainance </li>
        <li>
          <Link
            to="/admin/admin-profile"
            className={`flex py-2 pl-3 rounded-lg ${
              location.pathname === "/admin/admin-profile"
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >
            Setting
          </Link>
        </li>
        <li onClick={handleSignOut} className="cursor-pointer flex py-2 pl-3 rounded-lg hover:bg-gray-700"> 
          Sign out
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
