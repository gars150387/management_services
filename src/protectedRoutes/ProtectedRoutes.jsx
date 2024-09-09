/* eslint-disable react/prop-types */
// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "../components/NavigationBar";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

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
    <main>
      <header>
        <Navbar />
      </header>
      {children}
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
