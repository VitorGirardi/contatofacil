// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await fetch(`http://localhost:3001/contacts?user_id=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setContacts(data);
        } else {
          console.error('Erro ao buscar contatos:', data.error);
        }
      } catch (err) {
        console.error('Erro ao buscar contatos:', err);
      }
    };

    fetchContacts();
  }, []);

  const handleEdit = (contact) => {
    navigate(`/edit-contact/${contact.id}`, { state: { contact } });
  };

  return (
    <div className="dash-container">
      <header className="dash-header">
        <h1>CONTATO FACIL</h1>
        <button onClick={() => {
          localStorage.removeItem('userId');
          navigate('/login');
        }} className="dash-logout-button">Sair</button>
      </header>
      <div className="dash-content">
        <nav className="dash-nav">
          <ul>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/contacts">Contatos</Link></li>
            <li><Link to="/settings">Configurações</Link></li>
          </ul>
        </nav>
        <div className="dash-main">
          <input type="text" placeholder="Buscar..." className="dash-search-bar" />
          <ul className="dash-contact-list">
            {contacts.map(contact => (
              <li key={contact.id} className="dash-contact-item">
                {contact.name} - {contact.phone} {contact.favorite && <span>★</span>}
                <button onClick={() => handleEdit(contact)}>Editar</button>
              </li>
            ))}
          </ul>
          <button onClick={() => navigate('/add-contact')} className="dash-add-contact-button">+</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
