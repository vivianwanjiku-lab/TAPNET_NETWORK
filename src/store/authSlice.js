import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const login = createAsyncThunk("auth/login", async ({ email, password, admin }) => {
  const url = admin ? "/auth/admin/login" : "/auth/login";
  const { data } = await api.post(url, { email, password });
  localStorage.setItem("tapnet_token", data.access_token);
  localStorage.setItem("tapnet_user", JSON.stringify(data.user));
  return data.user;
});

export const register = createAsyncThunk("auth/register", async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  localStorage.setItem("tapnet_token", data.access_token);
  localStorage.setItem("tapnet_user", JSON.stringify(data.user));
  return data.user;
});

const slice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("tapnet_user") || "null"),
    token: localStorage.getItem("tapnet_token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("tapnet_token");
      localStorage.removeItem("tapnet_user");
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
      .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
      .addCase(register.fulfilled, (s, a) => { s.user = a.payload; });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
