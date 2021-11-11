import * as R from 'ramda';
import { createSelector } from 'reselect';

export const usersSelector = R.path(['app', 'users']);

export const servicesSelector = createSelector(
  R.path(['app', 'services']),
  (services) => Object.values(services)
)

export const appointmentsSelector = createSelector(
  R.path(['app', 'appointments']),
  R.path(['app', 'users']),
  R.path(['app', 'services']),
  (appointments, users, services) => {
    const user_mapping = {};
    for (const user of users) {
      user_mapping[user.id] = user;
    }

    return appointments.map(appointment => ({
      id: appointment.id,
      datetime: appointment.datetime,
      user: user_mapping[appointment.userId],
      services: appointment.services.map(id => services[id]),
      total: appointment.total
    }))
  }
);
