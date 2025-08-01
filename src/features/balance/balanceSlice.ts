import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBalanceAPI, topUpBalance } from "./balanceAPI";
import type { RootState } from "../../app/store";

interface BalanceState {
  value: number;
  loading: boolean;
  error: string | null;
}

const initialState: BalanceState = {
  value: 0,
  loading: false,
  error: null,
};

// Fetch balance
export const getBalance = createAsyncThunk(
  "balance/getBalance",
  async (_, thunkAPI) => {
    try {
      const response = await getBalanceAPI();
      return response.data.balance;
    } catch {
      return thunkAPI.rejectWithValue("Gagal mengambil saldo");
    }
  }
);

// Top up balance
export const saveTopup = createAsyncThunk(
  "balance/saveTopup",
  async (payload: { top_up_amount: number }, thunkAPI) => {
    try {
      const response = await topUpBalance(payload);
      return response.data.balance;
    } catch {
      return thunkAPI.rejectWithValue("Gagal melakukan top up");
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(saveTopup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTopup.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(saveTopup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }),
});

export const selectBalance = (state: RootState) => state.balance.value;
export default balanceSlice.reducer;
