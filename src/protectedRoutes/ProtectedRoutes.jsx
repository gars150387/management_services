/* eslint-disable react/prop-types */
// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

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

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
