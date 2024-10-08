/* eslint-disable react/prop-types */
// src/components/ProtectedRoute.jsx
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "../components/NavigationBar";
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
      <main
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <header
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "-5rem auto 5rem",
          }}
        >
          <Navbar />
        </header>
        <body
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          {children}
        </body>
      </main>
    </NavbarContext.Provider>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
