import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId'); // Certifique-se de que o ID do usuário está sendo armazenado no localStorage corretamente
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/user/${userId}`);
        if (!response.ok) {
          throw new Error(`Erro ao carregar perfil: ${response.statusText}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
        alert('Erro ao carregar perfil');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="profile-container">
      {userData ? (
        <div className="profile-box">
          <h1>Perfil</h1>
          <p><strong>Usuário:</strong> {userData.username}</p>
          <p><strong>Nome:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Telefone:</strong> {userData.phone}</p>
          <p><strong>Data de Nascimento:</strong> {new Date(userData.birthdate).toLocaleDateString()}</p>
        </div>
      ) : (
        <div className="error">Usuário nao encontrado</div>
      )}
    </div>
  );
};

export default Profile;
