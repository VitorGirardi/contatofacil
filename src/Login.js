import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token); // Supondo que o token seja retornado no campo 'token'
      } else {
        alert(`Erro ao fazer login: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao fazer login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>CONTATO FACIL</h1>
        <input 
          type="text" 
          placeholder="Login" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
        <div className="login-links">
          <p>
            Não tem login? <Link to="/register">Cadastre-se</Link>
          </p>
          <p>
            <Link to="/recover">Esqueceu sua senha?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
