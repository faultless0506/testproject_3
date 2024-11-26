import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultUsers = [
  { name: "John Doe", email: "1oGmD@example.com" },
  { name: "Jane Doe", email: "2oGmD@example.com" },
  { name: "George Doe", email: "3oGmD@example.com" },
];
interface User {
  name: string;
  email: string;
}
interface UserState {
  users: User[];
  currentUser: User | null;
}

const initialState: UserState = {
  users: defaultUsers,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      const user = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (user) {
        state.currentUser = user;
      } else {
        state.currentUser = null;
      }
    },
    logout(state) {
      state.currentUser = null;
    },
    register(state, action: PayloadAction<User>) {
      const user = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (!user) {
        state.users.push(action.payload);
        state.currentUser = action.payload;
      }
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;
