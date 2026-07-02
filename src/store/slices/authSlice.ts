import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  fullname: string;
  email: string;
  role: string;
  organization_id: number;
  permissions: string[]
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (
      state,
      action: PayloadAction<User>
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  setUser,
  logout,
  finishLoading,
} = authSlice.actions;

export default authSlice.reducer;