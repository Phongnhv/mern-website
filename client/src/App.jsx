import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/UserPages/Profile";
import CreateListing from "./pages/UserPages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Search from "./pages/Search";
import Listing from "./pages/Listing";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import PublicRoute from "./components/PublicRoute";

import AdminProfile from "./pages/AdminPages/AdminProfile";
import Setting from "./pages/UserPages/Setting";

import Footer from "./components/Footer";



const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col w-full">
      {!isAdminRoute && <Header />}
      {children}
      <Footer />
    </div>
  );
};
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoute />}>
            <Route path="/sign-in" element={<SignIn/>} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/settings/*" element={<Setting  />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:listingId" element={<UpdateListing />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
