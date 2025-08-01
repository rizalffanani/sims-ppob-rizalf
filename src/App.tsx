import React, { type ReactElement } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Dashboard from "./pages/DashboardPage";
import TopUpPage from "./pages/TopUpPage";
import Transaction from "./pages/TransactionPage";
import TransactionNew from "./pages/TransactionNewPage";
import AccountPage from "./pages/AccountPage";
import { useAppSelector } from "./app/hooks";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  const showSidebar = !["/login", "/register"].includes(pathname);
  const showHeader = [
    "/dashboard",
    "/topup",
    "/transaction",
    "/transactionNew",
  ].includes(pathname);

  return (
    <>
      {showSidebar && <Sidebar />}
      {showHeader && <Header />}
      {children}
    </>
  );
};

const PrivateRoute = ({ element }: { element: ReactElement }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/topup"
            element={<PrivateRoute element={<TopUpPage />} />}
          />
          <Route
            path="/transaction"
            element={<PrivateRoute element={<Transaction />} />}
          />
          <Route
            path="/transactionNew"
            element={<PrivateRoute element={<TransactionNew />} />}
          />
          <Route
            path="/account"
            element={<PrivateRoute element={<AccountPage />} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
