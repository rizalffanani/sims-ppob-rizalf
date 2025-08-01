import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchServices,
  clearSelectedService,
} from "../features/services/serviceSlice";
import { newTransaction } from "../features/transaction/transactionSlice";

const TransactionNewPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedService = useAppSelector(
    (state) => state.services.selectedService
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedService) navigate("/dashboard");
  }, [selectedService, navigate]);

  const handleTransaction = async () => {
    if (!selectedService) return;

    setLoading(true);
    try {
      await dispatch(
        newTransaction({ service_code: selectedService.service_code })
      );
      alert("Transaksi berhasil!");
    } catch {
      alert("Gagal melakukan transaksi.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedService) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transaksi Layanan</h2>
      <div className="max-w-sm mx-auto border p-4 rounded shadow">
        <h3 className="mb-2">Pembayaran</h3>

        <div className="flex items-center gap-3 mb-3">
          <img
            src={selectedService.service_icon}
            alt={selectedService.service_name}
            className="h-10"
            onError={(e) =>
              (e.currentTarget.src =
                "https://via.placeholder.com/40?text=No+Icon")
            }
          />
          <p className="text-sm">{selectedService.service_name}</p>
        </div>

        <input
          type="number"
          readOnly
          value={selectedService.service_tariff}
          className="w-full border p-2 mb-2 bg-gray-100"
        />

        <button
          onClick={handleTransaction}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full disabled:opacity-50"
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
    </div>
  );
};

export default TransactionNewPage;
