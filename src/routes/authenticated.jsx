// src/App.jsx
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import SignUpCompanyPage from "../authentication/SigUpCompany";
import ClientList from "../client/MainPage";
import CreateClient from "../client/NewClient";
import Navbar from "../components/NavigationBar";
import MainPage from "../dashboard/MainPage";

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
        </Routes>
      </Router>
    </main>
  );
};

export default Authenticated;
