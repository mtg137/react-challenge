import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { usersSelector, servicesSelector } from '../../state/app/app.selector';
import { addAppointment } from '../../state/app/app.reducer';

const AppointmentForm = (props) => {
  const allUsers = useSelector(usersSelector);
  const allServices = useSelector(servicesSelector);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [user, setUser] = useState(allUsers.length ? allUsers[0].id : 0);
  const [time, setTime] = useState('');
  const [services, setServices] = useState({});

  let total = 0;

  for (const service of allServices) {
    if (services[service.id]) {
      total += service.price;
    }
  }

  const handleSubmit = (e) => {
    dispatch(addAppointment({
      userId: user,
      datetime: time,
      services: Object.keys(services).filter(id => services[id]),
      total
    }))

    e.preventDefault();
    navigate('/', { replace: true })
  }

  const onChangeUser = (e) => {
    setUser(e.target.value);
  }

  const onChangeTime = (e) => {
    setTime(e.target.value);
  }

  const onSwitchService = (id) => {
    setServices({
      ...services,
      [id]: services[id] ? false : true
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Appointment:</h1>

      <label>user:</label>
      <select onChange={onChangeUser} value={user}>
        {
          allUsers.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({ !user.appointments ? 'no' : user.appointments } appointments)
            </option>
          ))
        }
      </select>

      <label>time:</label>
      <input type="datetime-local" onChange={onChangeTime} value={time} />

      <label>services: (total: {total})</label>
      <div className="services">
        {
          allServices.map(service => (
            <div key={service.id}>
              <input type="checkbox" onChange={() => onSwitchService(service.id)} />
              <label>{service.name}</label>
            </div>
          ))
        }
      </div>

      <input type="submit" value="Submit"/>
    </form>
  )
}

export default AppointmentForm;
