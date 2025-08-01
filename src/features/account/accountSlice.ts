import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, updateProfile, updateProfileImage } from "./accountAPI";

interface ProfileState {
  data: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  };
  loading: boolean;
}

const initialState: ProfileState = {
  data: {
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
  },
  loading: false,
};

export const fetchProfile = createAsyncThunk("profile/fetch", getProfile);
export const saveProfile = createAsyncThunk(
  "profile/save",
  async (payload: { first_name: string; last_name: string }) =>
    await updateProfile(payload)
);
export const uploadImage = createAsyncThunk(
  "profile/upload",
  async (file: File) => await updateProfileImage(file)
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logoutProfile: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.data.profile_image = action.payload.data.profile_image;
      });
  },
});

export const { logoutProfile } = profileSlice.actions;
export default profileSlice.reducer;
