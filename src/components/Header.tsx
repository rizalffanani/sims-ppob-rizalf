import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProfile } from "../features/auth/authSlice";
import { getBalance, selectBalance } from "../features/balance/balanceSlice";
import profileImg from "../assets/profil.png";

export default function Header() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const balance = useAppSelector(selectBalance);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="header">
      <img
        src={user?.profile_image || profileImg}
        alt="Profile"
        className="profile-image"
      />
      <div className="greeting">
        <p>Selamat datang,</p>
        <h1>
          <strong>{`${user?.first_name ?? ""} ${
            user?.last_name ?? ""
          }`}</strong>
        </h1>
        <p>
          Saldo: <strong>Rp {balance.toLocaleString("id-ID")}</strong>
        </p>
      </div>
    </div>
  );
}
