import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHistoryTransactionAPI } from "./transactionAPI";
import type { RootState } from "../../app/store";
interface HistoryItem {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}

interface HistoryState {
  items: HistoryItem[];
  loading: boolean;
  error: string | null;
  offset: number;
  limit: number;
}

const initialState: HistoryState = {
  items: [],
  loading: false,
  error: null,
  offset: 0,
  limit: 5,
};

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { offset, limit } = state.transaction;
      return await getHistoryTransactionAPI(
        offset.toString(),
        limit.toString()
      );
    } catch {
      return thunkAPI.rejectWithValue("Gagal mengambil data layanan");
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    resetHistory(state) {
      state.items = [];
      state.offset = 0;
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
        state.items = [...state.items, ...action.payload.data.records];
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetHistory, incrementOffset } = historySlice.actions;
export default historySlice.reducer;
