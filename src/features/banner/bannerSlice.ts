import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBannerAPI } from "./bannerAPI";
import type { RootState } from "../../app/store";

export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

interface BannerState {
  data: Banner[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  data: [],
  loading: false,
  error: null,
};

// ✅ Ubah nama agar konsisten
export const fetchBanner = createAsyncThunk(
  "banner/fetchBanner",
  async (_, thunkAPI) => {
    try {
      const response = await getBannerAPI();
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Gagal mengambil data banner");
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBanner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// ✅ Selector biar komplit
export const selectBanner = (state: RootState) => state.banner.data;
export const selectBannerLoading = (state: RootState) => state.banner.loading;
export const selectBannerError = (state: RootState) => state.banner.error;

export default bannerSlice.reducer;
