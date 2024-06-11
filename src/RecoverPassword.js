import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RecoverPassword.css';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');

  const handleRecover = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Instruções de recuperação de senha enviadas!');
      } else {
        alert(`Erro ao recuperar senha: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao recuperar senha');
    }
  };

  return (
    <div className="recover-container">
      <div className="recover-box">
        <h1>Contato Facil</h1>
        <h2>Recuperar Senha</h2>
        <form onSubmit={handleRecover}>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
        <div className="recover-links">
          <p>
            <Link to="/login">Voltar para o login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
