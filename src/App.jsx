import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./authentication/LoginPage";
import SignUpPage from "./authentication/SignUpUser";
import SignUpCompanyPage from "./authentication/SigUpCompany";
import ClientList from "./client/MainPage";
import CreateClient from "./client/NewClient";
import MainPage from "./dashboard/MainPage";
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes";

function App() {
  return (
      <Router>
        <Routes>
          {/* Public routes */}
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/sign_up" element={<SignUpPage />} />
          <Route exact path="/signup-company" element={<SignUpCompanyPage />} />

          {/* Protected routes */}
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/new-client"
            element={
              <ProtectedRoute>
                <CreateClient />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/clients"
            element={
              <ProtectedRoute>
                <ClientList />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
  );
}

export default App;
