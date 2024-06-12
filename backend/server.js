const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;  // Porta para o servidor backend

// Configurar a conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
});

// Middleware para parsing do JSON e CORS
app.use(express.json());
app.use(cors());

// Endpoint para verificar a conexão com o banco de dados
app.get('/test-connection', async (req, res) => {
  try {
    const client = await pool.connect();
    res.status(200).json({ message: 'Conectado ao banco de dados com sucesso!' });
    client.release();
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
  }
});

// Endpoint para recuperação de senha
app.post('/recover', async (req, res) => {
  const { email } = req.body;
  res.send(`Instruções de recuperação de senha enviadas para ${email}`);
});

// Endpoint para registro de usuário
app.post('/register', async (req, res) => {
  const { username, name, email, phone, birthdate, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, name, email, phone, birthdate, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, name, email, phone, birthdate, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// Endpoint para login
app.post('/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [login, password]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(401).json({ error: 'Login ou senha incorretos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Endpoint para criar um contato
app.post('/contacts', async (req, res) => {
  const { name, birthdate, phone, favorite } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, birthdate, phone, favorite) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, birthdate, phone, favorite]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar contato' });
  }
});

// Endpoint para buscar todos os contatos
app.get('/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar contatos' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
