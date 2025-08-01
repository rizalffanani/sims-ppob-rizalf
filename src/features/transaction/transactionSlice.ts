import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHistoryTransactionAPI, newTransactionAPI } from "./transactionAPI";
import type { RootState } from "../../app/store";

interface HistoryItem {
  invoice_number: string;
  description: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}

interface TransactionState {
  items: HistoryItem[];
  loading: boolean;
  error: string | null;
  offset: number;
  limit: number;
  hasMore: boolean;
}

const initialState: TransactionState = {
  items: [],
  loading: false,
  error: null,
  offset: 0,
  limit: 5,
  hasMore: true,
};

// Async: Fetch history
export const fetchHistory = createAsyncThunk(
  "transaction/fetchHistory",
  async (_, thunkAPI) => {
    try {
      const { offset, limit } = (thunkAPI.getState() as RootState).transaction;
      const response = await getHistoryTransactionAPI(
        offset.toString(),
        limit.toString()
      );
      return response.data?.records || [];
    } catch {
      return thunkAPI.rejectWithValue("Gagal mengambil riwayat transaksi");
    }
  }
);

// Async: New transaction
export const newTransaction = createAsyncThunk(
  "transaction/newTransaction",
  async (payload: { service_code: string }, thunkAPI) => {
    try {
      return await newTransactionAPI(payload);
    } catch {
      return thunkAPI.rejectWithValue("Gagal memproses transaksi");
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetHistory(state) {
      state.items = [];
      state.offset = 0;
      state.hasMore = true;
    },
    incrementOffset(state) {
      state.offset += state.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;

        // Filter duplikat berdasarkan invoice_number
        const newItems = (action.payload as HistoryItem[]).filter(
          (item: HistoryItem) =>
            !state.items.some(
              (existing) => existing.invoice_number === item.invoice_number
            )
        );

        state.items.push(...newItems);
        state.hasMore = newItems.length > 0; // Jika tidak ada data baru, berarti data habis
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetHistory, incrementOffset } = transactionSlice.actions;
export default transactionSlice.reducer;
