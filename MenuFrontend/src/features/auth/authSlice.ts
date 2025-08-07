import { createSlice, type PayloadAction } from "@reduxjs/toolkit"; 

interface AuthState {
  token: string | null;// می‌تونه ایمیل یا نام کاربری باشه
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string}>) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
