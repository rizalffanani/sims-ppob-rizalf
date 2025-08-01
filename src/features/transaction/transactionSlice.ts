// src/features/transaction/transactionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: number;
  amount: number;
  description: string;
  created_at: string;
}

interface TransactionState {
  history: Transaction[];
}

const initialState: TransactionState = {
  history: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<Transaction[]>) => {
      state.history = action.payload;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { setHistory, clearHistory } = transactionSlice.actions;
export default transactionSlice.reducer;
