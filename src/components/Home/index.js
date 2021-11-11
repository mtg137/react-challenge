import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { usersSelector, appointmentsSelector } from '../../state/app/app.selector';
import './style.css';

const Home = (props) => {
  const users = useSelector(usersSelector);
  const appointments = useSelector(appointmentsSelector);

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
              appointments.map(appointment => (
                <tr key={appointment.id}>
                  <th>{appointment.user.name}</th>
                  <th>{appointment.datetime}</th>
                  <th>
                    {appointment.services.map(service => service.name).join(', ')} ( ${appointment.total} )
                  </th>
                </tr>
              ))
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
