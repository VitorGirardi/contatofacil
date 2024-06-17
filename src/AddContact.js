import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddContact.css';

const AddContact = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  

  return (
    <div className="add-contact-container">
      <div className="add-contact-box">
        <h1>CONTATO FACIL</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profile">Profile</label>
            <input type="file" id="profile" name="profile" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Data de Nascimento</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="favorite">Favoritos</label>
            <input
              type="checkbox"
              id="favorite"
              name="favorite"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
            />
          </div>
          <button type="submit">SALVAR</button>
        </form>
        <Link to="/dashboard">Voltar ao Dashboard</Link>
      </div>
    </div>
  );
};

export default AddContact;
