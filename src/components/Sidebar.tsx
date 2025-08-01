import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className={`p-2 rounded ${
            isActive("/dashboard") ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/topup"
          className={`p-2 rounded ${
            isActive("/topup") ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          Top Up
        </Link>
        <Link
          to="/transaction"
          className={`p-2 rounded ${
            isActive("/transaction") ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          Transaction
        </Link>
        <Link
          to="/account"
          className={`p-2 rounded ${
            isActive("/account") ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          Akun
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
