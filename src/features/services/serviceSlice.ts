import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getServicesAPI } from "./serviceAPI";
import type { RootState } from "../../app/store";

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

interface ServiceState {
  data: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  data: [],
  loading: false,
  error: null,
};

export const getServices = createAsyncThunk(
  "services/fetch",
  async (_, thunkAPI) => {
    try {
      return await getServicesAPI();
    } catch {
      return thunkAPI.rejectWithValue("Gagal mengambil data layanan");
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectServices = (state: RootState) => state.services.data;
export default serviceSlice.reducer;
