import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import "./App.css";
import LoginPage from "./authentication/LoginPage";
import SignUpPage from "./authentication/SignUpUser";
import SignUpCompanyPage from "./authentication/SigUpCompany";
import ClientList from "./client/MainPage";
import CreateClient from "./client/NewClient";
import Navbar from "./components/NavigationBar";
import MainPage from "./dashboard/MainPage";
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes";
function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/signup-company"
          element={
            <ProtectedRoute>
              <SignUpCompanyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <MainPage />
            // <ProtectedRoute>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ClientList />
            // <ProtectedRoute>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/new-client"
          element={
            <CreateClient />
            // <ProtectedRoute>
            // </ProtectedRoute>
          }
        />

        {/* <Route key={"/*"} path="/*" element={<Navigate to="/" replace />} /> */}

        {/* Catch-all for 404 */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
