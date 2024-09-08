// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "../dashboard/MainPage";
import SignUpCompanyPage from "../authentication/SigUpCompany";
import Navbar from "../components/NavigationBar";
import CreateClient from "../client/NewClient";
import ClientList from "../client/MainPage";

const Authenticated = () => {
  return (
    <main>
      <Navbar />

      <Router>
        <Routes>
          {/* Define your routes here */}{" "}
          <Route
            key={"/signup-company"}
            path="/signup-company"
            element={<SignUpCompanyPage />}
          />
          <Route key={"/dashboard"} path="/dashboard" element={<MainPage />} />
          <Route
            key={"/new-client"}
            path="/new-client"
            element={<CreateClient />}
          />
          <Route key={"/clients"} path="/clients" element={<ClientList />} />
          <Route key={"/*"} path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </main>
  );
};

export default Authenticated;
