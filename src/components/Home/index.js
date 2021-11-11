import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { usersSelector, appointmentsSelector } from '../../state/app/app.selector';
import './style.css';

const Home = (props) => {
  const [searchText, setSearchText] = useState('');
  const users = useSelector(usersSelector);
  const appointments = useSelector(appointmentsSelector);

  const changeSearchText = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div>
      <div className="section">
        <h2 className="title">Patients:</h2>
        <div className="list">
          {
            users.map(user => (
              <div key={user.id}>{user.name}</div>
            ))
          }
        </div>

        <Link to="/new-user">Create Patient</Link>
      </div>

      <div className="section">
        <h2 className="title">Appointments:</h2>

        <input type="text" value={searchText} onChange={changeSearchText} />
        <table className="list">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Appointment</th>
              <th>Services</th>
            </tr>
          </thead>

          <tbody>
            {
              appointments.map(appointment => {
                let valid = appointment.user.name.includes(searchText);

                if (!valid) {
                  for (const service of appointment.services) {
                    if (service.name.includes(searchText)) {
                      valid = true;
                    }
                  }
                }

                return valid ? (
                  <tr key={appointment.id}>
                    <th>{appointment.user.name}</th>
                    <th>{appointment.datetime}</th>
                    <th>
                      {appointment.services.map(service => service.name).join(', ')} ( ${appointment.total} )
                    </th>
                  </tr>
                ) : <></>
              })
            }
          </tbody>
        </table>

        {
          users.length && <Link to="/new-appointment">Create Appointment</Link> || <></>
        }
      </div>
    </div>
  )
}

export default Home;
