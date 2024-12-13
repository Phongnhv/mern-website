// AdminDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <UserSidebar className = "h-full" />
      <div className="flex-grow p-6">
      </div>
    </div>
  );
};

export default AdminDashboard;
