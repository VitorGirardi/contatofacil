import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password: senha })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.id); 
        alert('Login realizado com sucesso!');
        navigate('/dashboard');
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
          value={login} 
          onChange={(e) => setLogin(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)}
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
