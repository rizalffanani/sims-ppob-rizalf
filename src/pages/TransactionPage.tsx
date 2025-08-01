import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchHistory,
  incrementOffset,
} from "../features/transaction/transactionSlice";

const TransactionHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, items } = useAppSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const handleShowMore = () => {
    dispatch(incrementOffset());
    dispatch(fetchHistory());
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transaction History</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.invoice_number}
            className="border rounded-xl p-4 shadow-sm"
          >
            <p className="font-semibold">{item.service_name}</p>
            <p className="text-sm text-gray-600">{item.transaction_type}</p>
            <p className="text-green-600">
              Rp {item.total_amount.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(item.created_on).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <div className="text-center mt-4">
          <button onClick={handleShowMore}>Show More</button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
