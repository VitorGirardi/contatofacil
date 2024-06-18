// AddContact.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AddContact.css';

const AddContact = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { name, birthdate, phone, favorite };

    try {
      const response = await fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        console.log('Contato adicionado com sucesso');
        navigate('/dashboard');
      } else {
        const data = await response.json();
        console.error('Erro ao adicionar contato:', data.error);
      }
    } catch (err) {
      console.error('Erro ao adicionar contato:', err);
    }
  };

  return (
    <div className="add-contact-container">
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Data de Nascimento:
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
        </label>
        <label>
          Telefone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Favorito:
          <input type="checkbox" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} />
        </label>
        <button type="submit">Salvar</button>
      </form>
      <Link to="/dashboard">Voltar ao Dashboard</Link>
    </div>
  );
};

export default AddContact;
