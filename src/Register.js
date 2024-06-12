import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Usuário registrado com sucesso!');
      } else {
        alert(`Erro ao registrar usuário: ${data.error}\nDetalhes: ${data.details}`);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao registrar usuário');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Contato Facil</h1>
        <h2>Menu de cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone:</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Data de nascimento:</label>
            <input 
              type="date" 
              id="birthdate" 
              name="birthdate" 
              value={formData.birthdate} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
        <div className="register-links">
          <p>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
