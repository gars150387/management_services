import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
// import LoginPage from "./authentication/LoginPage";
// import SignUpPage from "./authentication/SignUpUser";
// import SignUpCompanyPage from "./authentication/SigUpCompany";
// import ClientList from "./client/MainPage";
// import CreateClient from "./client/NewClient";
// import MainPage from "./dashboard/MainPage";
// import ProtectedRoute from "./protectedRoutes/ProtectedRoutes";
const LandingPage = lazy(() => import("./landingPage/LandingPage"));
const LoginPage = lazy(() => import("./authentication/LoginPage"));
const SignUpPage = lazy(() => import("./authentication/SignUpUser"));
const SignUpCompanyPage = lazy(() => import("./authentication/SigUpCompany"));
const ClientList = lazy(() => import("./client/MainPage"));
const Profile = lazy(() => import("./profile/Profile"));
const MainPage = lazy(() => import("./dashboard/MainPage"));
const ProtectedRoute = lazy(() => import("./protectedRoutes/ProtectedRoutes"));

function App() {
  return (
    <Suspense
      fallback={
        <div>
          <h4>Loading</h4>
        </div>
      }
    >
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/signup-company" element={<SignUpCompanyPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <ProtectedRoute>
                  <ClientList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
