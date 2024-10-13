/* eslint-disable react/prop-types */
// src/components/ProtectedRoute.jsx
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { supabase } from "../supabaseClient";
export const NavbarContext = createContext();
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [value, setValue] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      setIsAuthenticated(!!session?.session?.user);
    };

    getUser();
  }, []);

  if (isAuthenticated === null) {
    // You can return a loading spinner or skeleton here
    return <p>Loading...</p>;
  }

  return isAuthenticated ? (
    <NavbarContext.Provider value={{ value, setValue }}>
      <Navigation />
      {children}
    </NavbarContext.Provider>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
