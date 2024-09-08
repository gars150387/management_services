import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./authentication/LoginPage";
import SignUpPage from "./authentication/SignUpUser";
// import SignUpCompanyPage from "./authentication/SigUpCompany";
// import ClientList from "./client/MainPage";
// import CreateClient from "./client/NewClient";
import Navbar from "./components/NavigationBar";
// import MainPage from "./dashboard/MainPage";
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes";
import Authenticated from "./routes/authenticated";
function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Authenticated />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/"
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
          path="/new-client"
          element={
            <ProtectedRoute>
              <CreateClient />
            </ProtectedRoute>
          }
        /> */}

        {/* <Route key={"/*"} path="/*" element={<Navigate to="/" replace />} /> */}

        {/* Catch-all for 404 */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </div>
  );
}

export default App;
