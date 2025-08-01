// src/pages/TopUpPage.tsx
import { useState } from "react";
import { topUp } from "../features/balance/balanceAPI";

const TopUpPage = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTopUp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await topUp(parseInt(amount));
      setMessage("Top up berhasil!");
      console.log(response);
    } catch (error) {
      setMessage("Top up gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top Up</h2>
      <div className="bg-white p-4 rounded shadow">
        <label className="block mb-2">Nominal Top Up</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleTopUp}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading || !amount}
        >
          {loading ? "Memproses..." : "Top Up"}
        </button>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default TopUpPage;
