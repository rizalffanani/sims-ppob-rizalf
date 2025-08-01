import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header"; // ⬅️ Import Header
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TopUpPage from "./pages/TopUpPage";
import TransactionPage from "./pages/TransactionPage";
import { useAppSelector } from "./app/hooks";

type LayoutProps = { children: React.ReactNode };
const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const path = location.pathname;

  const showSidebar = path !== "/login" && path !== "/register";
  const showHeader =
    path === "/dashboard" || path === "/topup" || path === "/transaction";

  return (
    <>
      {showSidebar && <Sidebar />}
      {showHeader && <Header />}
      {children}
    </>
  );
};

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/topup" element={<TopUpPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
