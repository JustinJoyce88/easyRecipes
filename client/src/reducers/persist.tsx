import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PersistState {
  authToken: string;
}

const initialState: PersistState = {
  authToken: '',
};

export const persistSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    logOut: (state) => {
      state.authToken = '';
    },
  },
});

export const { setAuthToken, logOut } = persistSlice.actions;

export default persistSlice.reducer;
