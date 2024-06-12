import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddContact.css';

const AddContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    phone: '',
    favorite: false,
    profileImage: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        profileImage: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = {
      name: formData.name,
      birthdate: formData.birthdate,
      phone: formData.phone,
      favorite: formData.favorite
    };
    try {
      const response = await fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact)
      });
      if (response.ok) {
        alert('Contato salvo com sucesso!');
        navigate('/dashboard');
      } else {
        alert('Erro ao salvar contato');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar contato');
    }
  };

  return (
    <div className="add-contact-container">
      <div className="add-contact-box">
        <div className="contact-header">
          <h1>CONTATO FACIL</h1>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="profileImage" className="profile-label">Profile</label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="profile-input"
              />
              {formData.profileImage && (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile"
                  className="profile-preview"
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
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
              <label htmlFor="birthdate">Data de Nascimento</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group favorite-group">
              <input
                type="checkbox"
                id="favorite"
                name="favorite"
                checked={formData.favorite}
                onChange={handleChange}
              />
              <label htmlFor="favorite">Favoritos</label>
            </div>
            <button type="submit" className="save-button">SALVAR</button>
          </form>
          <div className="back-to-dashboard">
            <Link to="/dashboard">Voltar ao Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
