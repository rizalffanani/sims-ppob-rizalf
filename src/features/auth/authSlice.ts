import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  registerAPI,
  getProfileAPI,
  updateProfile,
  updateProfileImage,
} from "./authAPI";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  balance: number;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  balance: 0,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null,
};

// Thunks
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      return await loginAPI(email, password);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      firstName,
      lastName,
      password,
    }: { email: string; firstName: string; lastName: string; password: string },
    thunkAPI
  ) => {
    try {
      return await registerAPI(email, firstName, lastName, password);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Register failed"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkAPI) => {
    try {
      return await getProfileAPI();
    } catch {
      return thunkAPI.rejectWithValue("Gagal mengambil profile");
    }
  }
);

export const saveProfile = createAsyncThunk(
  "auth/saveProfile",
  async (payload: { first_name: string; last_name: string }, thunkAPI) => {
    try {
      return await updateProfile(payload);
    } catch {
      return thunkAPI.rejectWithValue("Gagal update profil");
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "auth/uploadProfileImage",
  async (file: File, thunkAPI) => {
    try {
      return await updateProfileImage(file);
    } catch {
      return thunkAPI.rejectWithValue("Gagal upload gambar");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login & Register
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload.data };
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Profile
      .addCase(saveProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.first_name = action.payload.data.first_name;
          state.user.last_name = action.payload.data.last_name;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })

      // Upload Image
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profile_image = action.payload.data.profile_image;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
