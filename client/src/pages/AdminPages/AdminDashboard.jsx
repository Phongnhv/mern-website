import { Routes, Route } from 'react-router-dom';
import Sidebar from './SideBar';
import UserList from './UserList';
import EstateList from './EstateList';
import AdminProfile from './AdminProfile';


const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar className="fixed"/>
      <div className="flex-grow p-6">
        <Routes>
          <Route path="user-list" element={<UserList />} />
          <Route path="estate-list" element={<EstateList />} />
          <Route path="profile" element={<AdminProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
