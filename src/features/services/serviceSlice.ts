import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getServicesAPI } from "./serviceAPI";
import type { RootState } from "../../app/store";

export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

interface ServiceState {
  data: Service[];
  selectedService: Service | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  data: [],
  selectedService: null,
  loading: false,
  error: null,
};

// Fetch all services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, thunkAPI) => {
    try {
      const response = await getServicesAPI();
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Gagal mengambil data layanan");
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    selectService(state, action: PayloadAction<Service>) {
      state.selectedService = action.payload;
    },
    clearSelectedService(state) {
      state.selectedService = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }),
});

// Export actions
export const { selectService, clearSelectedService } = serviceSlice.actions;

// Export selectors
export const selectServices = (state: RootState) => state.services.data;
export const selectSelectedService = (state: RootState) =>
  state.services.selectedService;

export default serviceSlice.reducer;
