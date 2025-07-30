import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, getProfile } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Dashboard</h2>
      <p>
        Selamat datang, <b>{user?.name}</b>
      </p>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
