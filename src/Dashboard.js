import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [contactToRemove, setContactToRemove] = useState(null);
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

  const openRemovePopup = () => {
    setShowRemovePopup(true);
  };

  const closeRemovePopup = () => {
    setShowRemovePopup(false);
    setContactToRemove(null);
  };

  const handleRemoveContact = async () => {
    if (contactToRemove) {
      try {
        const response = await fetch(`http://localhost:3001/contacts/${contactToRemove.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== contactToRemove.id));
          closeRemovePopup();
        } else {
          const data = await response.json();
          console.error('Erro ao remover contato:', data.error);
        }
      } catch (err) {
        console.error('Erro ao remover contato:', err);
      }
    }
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
          <button onClick={openRemovePopup} className="dash-remove-contact-button">Remover Contato</button>
        </div>
      </div>

      {showRemovePopup && (
        <div className="remove-popup">
          <div className="remove-popup-content">
            <h3>Selecione o contato para remover:</h3>
            <ul className="popup-contact-list">
              {contacts.map(contact => (
                <li key={contact.id} onClick={() => setContactToRemove(contact)} className={contactToRemove?.id === contact.id ? 'selected' : ''}>
                  {contact.name} - {contact.phone} {contact.favorite && <span>★</span>}
                </li>
              ))}
            </ul>
            <button onClick={handleRemoveContact} className="confirm-remove-button">Confirmar Remoção</button>
            <button onClick={closeRemovePopup} className="cancel-remove-button">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
