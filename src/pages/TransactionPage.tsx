import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchHistory,
  incrementOffset,
} from "../features/transaction/transactionSlice";

const TransactionPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error, items, hasMore } = useAppSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const handleShowMore = () => {
    if (!loading && hasMore) {
      dispatch(incrementOffset());
      dispatch(fetchHistory());
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transaction History</h1>

      {loading && items.length === 0 && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.invoice_number}
            className="border rounded-xl p-4 shadow-sm"
          >
            <p className="font-semibold">{item.description}</p>
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

      {hasMore && !loading && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show More
          </button>
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <p className="text-center mt-4 text-gray-500">
          Semua transaksi telah ditampilkan.
        </p>
      )}
    </div>
  );
};

export default TransactionPage;
