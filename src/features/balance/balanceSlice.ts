import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBalanceAPI } from "./balanceAPI";
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

export const getBalance = createAsyncThunk(
  "balance/fetch",
  async (_, thunkAPI) => {
    try {
      return await getBalanceAPI();
    } catch {
      return thunkAPI.rejectWithValue("Gagal mengambil saldo");
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload.data.balance;
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectBalance = (state: RootState) => state.balance.value;
export default balanceSlice.reducer;
