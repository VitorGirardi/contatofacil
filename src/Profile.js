import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error('Erro ao buscar dados do usuário:', data.error);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h1>Perfil</h1>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Telefone: {user.phone}</p>
          <p>Data de Nascimento: {user.birthdate}</p>
          <button onClick={() => navigate('/dashboard')}>Voltar ao Dashboard</button>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Profile;
