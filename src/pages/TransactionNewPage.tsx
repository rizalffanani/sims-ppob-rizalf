import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getServices,
  selectService,
  clearSelectedService,
  serviceSelector,
  Service,
} from "../features/services/serviceSlice";
import api from "../features/api";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const services = useAppSelector(serviceSelector);
  const selectedService = useAppSelector(
    (state) => state.services.selectedService
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getServices());
    if (!selectedService) {
      navigate("/dashboard"); // kalau belum pilih service, balik ke dashboard
    }
  }, [dispatch, selectedService]);

  const handleSelect = (data: Service) => {
    dispatch(selectService(data));
  };

  const handleTransaction = async () => {
    if (!selectedService) return;
    setLoading(true);
    try {
      const savedUser = localStorage.getItem("user");
      let token = "";
      if (savedUser) {
        try {
          token = JSON.parse(savedUser).token;
        } catch {}
      }
      const res = await api.post(
        "/transaction",
        {
          service_code: selectedService.service_code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message || "Transaksi berhasil!");
      // dispatch(clearSelectedService());
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Gagal transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transaksi Layanan</h2>
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      {selectedService ? (
        <div className="max-w-sm mx-auto border p-4 rounded shadow">
          <h3 className="mb-2">PemBayaran</h3>

          <div style={{ display: "flex" }}>
            <img
              src={selectedService.service_icon}
              alt={selectedService.service_name}
              className="mx-auto h-10"
            />
            <p className="mt-2 text-sm">{selectedService.service_name}</p>
          </div>

          <input
            type="number"
            placeholder="Masukkan jumlah"
            value={selectedService.service_tariff}
            className="w-full border p-2 mb-2"
          />
          <button
            onClick={handleTransaction}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Memproses..." : "Kirim Transaksi"}
          </button>
          <button
            onClick={() => dispatch(clearSelectedService())}
            className="mt-2 w-full text-sm text-gray-500"
          >
            Kembali ke daftar layanan
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TransactionPage;
