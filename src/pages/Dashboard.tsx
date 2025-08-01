import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { getServices, selectServices } from "../features/services/serviceSlice";
import { getBanner, selectBanner } from "../features/banner/bannerSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const services = useAppSelector(selectServices);
  const banners = useAppSelector(selectBanner);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getServices());
    dispatch(getBanner());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      {services.length === 0 ? (
        <p>Tidak ada layanan</p>
      ) : (
        <ul>
          {services.map((s) => (
            <li key={s.service_code} style={{ marginBottom: "10px" }}>
              <img
                src={s.service_icon}
                alt={s.service_name}
                width={30}
                style={{ marginRight: 8 }}
              />
              {s.service_name} - Rp {s.service_tariff.toLocaleString("id-ID")}
            </li>
          ))}
        </ul>
      )}
      <h3>Temukan promo menarik</h3>
      {banners.length === 0 ? (
        <p>Tidak ada banner</p>
      ) : (
        <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
          {banners.map((b, i) => (
            <img
              key={i}
              src={b.banner_image}
              alt={b.banner_name}
              width={150}
              style={{ borderRadius: "8px" }}
            />
          ))}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
