import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBannerAPI } from "./bannerAPI";
import type { RootState } from "../../app/store";

interface Banner {
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

export const getBanner = createAsyncThunk(
  "banner/fetch",
  async (_, thunkAPI) => {
    try {
      return await getBannerAPI();
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
    builder.addCase(getBanner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectBanner = (state: RootState) => state.banner.data;
export default bannerSlice.reducer;
