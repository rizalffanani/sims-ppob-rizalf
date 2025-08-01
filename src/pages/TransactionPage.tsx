// src/pages/TransactionPage.tsx
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getServices,
  selectService,
  clearSelectedService,
  selectServices,
  Service,
} from "../features/services/serviceSlice";
import api from "../features/api";

const TransactionPage = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector(selectServices);
  const selectedService = useAppSelector(
    (state) => state.services.selectedService
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

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
      dispatch(clearSelectedService());
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
      {!selectedService ? (
        <div className="mb-4">
          <label htmlFor="service-select" className="block mb-1 font-medium">
            Pilih Layanan
          </label>
          <select
            id="service-select"
            className="w-full border p-2 rounded"
            defaultValue=""
            onChange={(e) => {
              const selected = services.find(
                (item) => item.service_code === e.target.value
              );
              if (selected) handleSelect(selected);
            }}
          >
            <option value="" disabled>
              -- Pilih layanan --
            </option>
            {services.map((item) => (
              <option key={item.service_code} value={item.service_code}>
                {item.service_name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        // <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        //   {services.map((item) => (
        //     <div
        //       key={item.service_code}
        //       className="border rounded p-2 hover:bg-gray-100 cursor-pointer text-center"
        //       onClick={() => handleSelect(item)}
        //     >
        //       <img
        //         src={item.service_icon}
        //         alt={item.service_name}
        //         className="mx-auto h-10"
        //       />
        //       <p className="mt-2 text-sm">{item.service_name}</p>
        //     </div>
        //   ))}
        // </div>
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
      )}
    </div>
  );
};

export default TransactionPage;
