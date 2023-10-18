import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PersistState {
  user: {
    userId: string;
    username: string;
    admin: boolean;
    token: string;
  };
}

const initialState: PersistState = {
  user: {
    userId: '',
    username: '',
    admin: false,
    token: '',
  },
};

export const persistSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, logOut } = persistSlice.actions;

export default persistSlice.reducer;
