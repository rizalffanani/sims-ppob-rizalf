import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, getProfile } from "../features/auth/authSlice";
import { getBalance, selectBalance } from "../features/balance/balanceSlice";
import { useNavigate } from "react-router-dom";
import profileImg from "../assets/profil.png";

export default function Dashboard() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const balance = useAppSelector(selectBalance);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <img src={profileImg} alt="Profile" />
      <p>Selamat datang,</p>
      <h1>
        <b>
          {user?.first_name} {user?.last_name}
        </b>
      </h1>
      <p>
        Saldo: <b>Rp {balance.toLocaleString("id-ID")}</b>
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
