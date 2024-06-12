import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import RecoverPassword from './RecoverPassword';
import AddContact from './AddContact';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/" element={<Login />} /> {/* Redirect to login by default */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
