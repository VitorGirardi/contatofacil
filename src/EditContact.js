import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditContact.css';

const EditContact = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`http://localhost:3001/contacts/${id}`);
        const data = await response.json();
        if (response.ok) {
          setName(data.name);
          setBirthdate(data.birthdate);
          setPhone(data.phone);
          setFavorite(data.favorite);
        } else {
          alert('Erro ao carregar contato');
        }
      } catch (err) {
        console.error('Erro ao carregar contato:', err);
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      name,
      birthdate,
      phone,
      favorite
    };
    try {
      const response = await fetch(`http://localhost:3001/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Contato atualizado com sucesso!');
        navigate('/dashboard');
      } else {
        alert(`Erro ao atualizar contato: ${data.error}`);
      }
    } catch (err) {
      console.error('Erro ao atualizar contato:', err);
      alert('Erro ao atualizar contato');
    }
  };

  return (
    <div className="edit-contact-container">
      <div className="edit-contact-box">
        <h1>CONTATO FACIL</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Data de Nascimento:</label>
            <input 
              type="date" 
              id="birthdate" 
              value={birthdate} 
              onChange={(e) => setBirthdate(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone:</label>
            <input 
              type="text" 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="favorite">Favorito:</label>
            <input 
              type="checkbox" 
              id="favorite" 
              checked={favorite} 
              onChange={(e) => setFavorite(e.target.checked)} 
            />
          </div>
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => navigate('/dashboard')}>Voltar</button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
