import { createSlice } from '@reduxjs/toolkit'
import services from '../../services';

export const initialState = {
  users: [],
  services
}

const appSplice = createSlice({
  name: 'app',
  initialState,
  reducers: {

  }
});

export default appSplice.reducer;

export const {

} = appSplice.actions;
