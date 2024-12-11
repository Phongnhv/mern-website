// AdminDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './SideBar';
import UserList from './UserList';
import EstateList from './EstateList';
import AdminProfile from './AdminProfile';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <Routes>
          <Route path="userList" element={<UserList />} />
          <Route path="estate-list" element={<EstateList />} />
          <Route path="admin-profile" element={<AdminProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;