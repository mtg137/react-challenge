import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import AppointmentForm from './components/AppointmentForm';
import Home from './components/Home';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-user" element={<UserForm />} />
        <Route path="/new-appointment" element={<AppointmentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
