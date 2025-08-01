import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { saveTopup } from "../features/balance/balanceSlice";

const TopUpPage = () => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTopUp = async () => {
    if (amount <= 0) return;

    setLoading(true);
    try {
      await dispatch(saveTopup({ top_up_amount: amount }));
      alert("Top up berhasil!");
      setAmount(0); // reset nominal setelah sukses
    } catch {
      alert("Terjadi kesalahan saat top up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top Up</h2>
      <div className="bg-white p-4 rounded shadow max-w-sm mx-auto">
        <label className="block mb-2 font-medium">Nominal Top Up</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 rounded w-full mb-4"
          min={1}
        />
        <button
          onClick={handleTopUp}
          disabled={loading || amount <= 0}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Top Up"}
        </button>
      </div>
    </div>
  );
};

export default TopUpPage;
