import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addUser } from '../../state/app/app.reducer';

export default (props) => {
  const [name, setName] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(name))
    navigate('/', { replace: true })
  }

  const handleChange = (evt) => {
    setName(evt.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Patient:</h1>

      <label>Name:</label>
      <input type="text" value={name} onChange={handleChange} />

      <br />
      <input type="submit" value="Submit"/>
    </form>
  )
}
