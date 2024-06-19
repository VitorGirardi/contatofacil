import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #004d40;
  border-radius: 5px;
  text-align: center;
  width: 100%;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;

  &:hover {
    background-color: #388e3c;
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0;
  width: 100%;

  .checkmark {
    position: relative;
    width: 24px;
    height: 24px;
    background-color: #eee;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }

  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 24px;
    height: 24px;
    z-index: 1;
    cursor: pointer;

    &:checked + .checkmark {
      background-color: #4caf50;
    }

    &:checked + .checkmark:after {
      content: "";
      position: absolute;
      display: block;
      left: 8px;
      top: 0px;
      width: 8px;
      height: 13px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
`;

const AddContact = () => {
  const [contactName, setContactName] = useState('');
  const [contactBirthdate, setContactBirthdate] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactFavorite, setContactFavorite] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const newContact = { name: contactName, birthdate: contactBirthdate, phone: contactPhone, favorite: contactFavorite, user_id: userId };

    try {
      const response = await fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard');
      } else {
        console.error('Erro ao adicionar contato:', data.error);
      }
    } catch (err) {
      console.error('Erro ao adicionar contato:', err);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <label>
          Nome:
          <Input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
        </label>
        <label>
          Data de Nascimento:
          <Input type="date" value={contactBirthdate} onChange={(e) => setContactBirthdate(e.target.value)} required />
        </label>
        <label>
          Telefone:
          <Input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />
        </label>
        <CheckboxContainer>
          Favorito
          <input type="checkbox" checked={contactFavorite} onChange={(e) => setContactFavorite(e.target.checked)} />
          <span className="checkmark"></span>
        </CheckboxContainer>
        <Button type="submit">Salvar</Button>
        <Link to="/dashboard">Voltar ao Dashboard</Link>
      </Form>
    </Container>
  );
};

export default AddContact;
