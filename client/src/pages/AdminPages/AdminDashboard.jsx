// AdminDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './SideBar';
import UserList from './UserList';
import EstateList from './EstateList';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <Routes>
          <Route path="userList" element={<UserList />} />
          <Route path="estate-list" element={<EstateList />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
