import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const userId = localStorage.getItem('userId'); 
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/contacts?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`Erro ao carregar contatos: ${response.statusText}`);
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
        alert('Erro ao carregar contato');
      }
    };
    fetchContacts();
  }, [navigate]);

  return (
    <div className="contacts-container">
      <h1>Contato</h1>
      <ul className="contacts-list">
        {contacts.map(contact => (
          <li key={contact.id}>
            <p>{contact.name} - {contact.phone}</p>
            <Link to={`/edit-contact/${contact.id}`} className="edit-button">Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
