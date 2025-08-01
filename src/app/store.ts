import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import balanceReducer from "../features/balance/balanceSlice";
import servicesReducer from "../features/services/serviceSlice";
import bannerReducer from "../features/banner/bannerSlice";
import transactionReducer from "../features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
    services: servicesReducer,
    banner: bannerReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
