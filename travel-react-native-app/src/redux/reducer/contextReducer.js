import { createSlice } from '@reduxjs/toolkit'

const contextSlice = createSlice({
  name: 'context',
  initialState: {
    user: null,
    loggedIn: false
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      let user = action.payload.user;
      state.user = {
        user_name: user.user_name,
        name: user.name,
        token: action.payload.accessToken,
        role: user.role,
        avatar: user.avatar
      }
    },
    logout: (state, action) => {
      state.loggedIn = false;
      state.user = null;
    }
  }
});

export const { login, logout } = contextSlice.actions

export default contextSlice.reducer