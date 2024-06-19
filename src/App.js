// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddContact from './AddContact';
import EditContact from './EditContact';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import RecoverPassword from './RecoverPassword';
import './Reset.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact/:id" element={<EditContact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover" element={<RecoverPassword />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
