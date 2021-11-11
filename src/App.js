import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserList from './components/UserList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
