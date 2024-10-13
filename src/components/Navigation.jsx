/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem("companyData");
      navigate("/");
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/dashboard" className="text-white font-bold text-xl">GARS | Management Service</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/clients">Clients</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/login"><button onClick={handleLogout}>Logout</button></NavLink>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/dashboard" mobile>Dashboard</NavLink>
            <NavLink to="/clients" mobile>Clients</NavLink>
            <NavLink to="/profile" mobile>Profile</NavLink>
            <NavLink to="/login"><button onClick={handleLogout}>Logout</button></NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};


const NavLink = ({ to, children, mobile }) => {
  const baseClasses = "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
  const mobileClasses = mobile ? "block" : "";

  return (
    <Link to={to} className={`${baseClasses} ${mobileClasses}`}>
      {children}
    </Link>
  );
};

export default Navigation;
