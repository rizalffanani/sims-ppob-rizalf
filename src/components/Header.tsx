import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProfile } from "../features/auth/authSlice";
import { getBalance, selectBalance } from "../features/balance/balanceSlice";
import profileImg from "../assets/profil.png";

export default function Header() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const balance = useAppSelector(selectBalance);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div>
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
    </div>
  );
}
