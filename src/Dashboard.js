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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>CONTATO FACIL</h1>
        <button onClick={() => {
          localStorage.removeItem('userId');
          navigate('/login');
        }} className="logout-button">Sair</button>
      </header>
      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <ul>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/contacts">Contatos</Link></li>
            <li><Link to="/settings">Configurações</Link></li>
          </ul>
        </nav>
        <div className="dashboard-main">
          <input type="text" placeholder="Buscar..." className="search-bar" />
          <ul className="contact-list">
            {contacts.map(contact => (
              <li key={contact.id} className="contact-item">
                {contact.name} - {contact.phone}
                <button onClick={() => handleEdit(contact)}>Editar</button>
              </li>
            ))}
          </ul>
          <button onClick={() => navigate('/add-contact')} className="add-contact-button">+</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
