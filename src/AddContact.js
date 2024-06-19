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
    const userId = localStorage.getItem('userId');
    const newContact = { name, birthdate, phone, favorite, user_id: userId };

    try {
      const response = await fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard');
      } else {
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
        <Link to="/dashboard" className="back-to-dashboard">Voltar ao Dashboard</Link>
      </form>
    </div>
  );
};

export default AddContact;
