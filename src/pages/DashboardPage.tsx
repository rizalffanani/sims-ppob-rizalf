import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchServices,
  selectService,
  selectServices,
  Service,
} from "../features/services/serviceSlice";
import { fetchBanner, selectBanner } from "../features/banner/bannerSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const services = useAppSelector(selectServices);
  const banners = useAppSelector(selectBanner);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchBanner());
  }, [dispatch]);

  const handleSelectService = (service: Service) => {
    dispatch(selectService(service));
    navigate("/transactionNew");
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <h2 className="text-xl font-bold mb-4">Pilih Layanan</h2>

      {services.length === 0 ? (
        <p className="text-gray-500">Tidak ada layanan</p>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div
              key={s.service_code}
              onClick={() => handleSelectService(s)}
              className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50"
            >
              <img
                src={s.service_icon}
                alt={s.service_name}
                className="w-8 h-8"
                onError={(e) =>
                  (e.currentTarget.src = "https://via.placeholder.com/30")
                }
              />
              <span className="text-sm font-medium">
                {s.service_name} - Rp {s.service_tariff.toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-lg font-semibold mt-8 mb-2">Temukan promo menarik</h3>

      {banners.length === 0 ? (
        <p className="text-gray-500">Tidak ada banner</p>
      ) : (
        <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
          {banners.map((b, i) => (
            <img
              key={i}
              src={b.banner_image}
              alt={b.banner_name}
              className="w-40 rounded"
              onError={(e) =>
                (e.currentTarget.src = "https://via.placeholder.com/150x80")
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
