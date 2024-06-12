import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:3001/contacts');
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.error('Erro ao buscar contatos', err);
      }
    };
    fetchContacts();
  }, []);

  const handleAddContact = () => {
    navigate('/add-contact');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>CONTATO FACIL</h1>
        <div className="search-bar-container">
          <input type="text" placeholder="Buscar..." className="search-bar" />
        </div>
        <button className="logout-button" onClick={logout}>Sair</button>
      </header>
      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button className="nav-button">PERFIL</button>
          <button className="nav-button">CONTATOS</button>
          <button className="nav-button">CONFIGURAÇÕES</button>
        </nav>
        <div className="contacts-section">
          <div className="alphabet-list">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
            <span>E</span>
            <span>F</span>
            <span>G</span>
            <span>H</span>
            <span>I</span>
            <span>J</span>
            <span>K</span>
            <span>L</span>
            <span>M</span>
            <span>N</span>
            <span>O</span>
            <span>P</span>
            <span>Q</span>
            <span>R</span>
            <span>S</span>
            <span>T</span>
            <span>U</span>
            <span>V</span>
            <span>W</span>
            <span>X</span>
            <span>Y</span>
            <span>Z</span>
          </div>
          <div className="contacts-list">
            {contacts.map((contact) => (
              <div className="contact-item" key={contact.id}>
                {contact.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="add-contact-button" onClick={handleAddContact}>+</button>
    </div>
  );
};

export default Dashboard;
