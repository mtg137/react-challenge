import { createSlice } from '@reduxjs/toolkit'
import services from '../../services';

export const initialState = {
  users: [],
  appointments: [],
  services: services.reduce((prev, service) => ({
    ...prev,
    [service.id]: service
  }), {})
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addUser (state, action) {
      state.users.push({
        id: state.users.length + 1,
        name: action.payload,
        appointments: 0
      })
    },

    addAppointment (state, action) {
      const appointment = action.payload;

      state.appointments.push({
        id: state.appointments.length + 1,
       ...appointment,
      });

      const user = state.users.find(user => user.id == appointment.userId)
      user.appointments = user.appointments + 1;
    }
  }
});

export default appSlice.reducer;

export const {
  addUser,
  addAppointment
} = appSlice.actions;
