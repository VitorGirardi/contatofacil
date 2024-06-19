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
  const { name, birthdate, phone, favorite, user_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, birthdate, phone, favorite, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, birthdate, phone, favorite, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar contato' });
  }
});

// Rota para buscar todos os contatos de um usuário
app.get('/contacts', async (req, res) => {
  const { user_id } = req.query;
  try {
    const result = await pool.query('SELECT * FROM contacts WHERE user_id = $1', [user_id]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar contatos:', err);
    res.status(500).json({ error: 'Erro ao buscar contatos' });
  }
});

// Rota para atualizar um contato
app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { name, birthdate, phone, favorite } = req.body;
  try {
    const result = await pool.query(
      'UPDATE contacts SET name = $1, birthdate = $2, phone = $3, favorite = $4 WHERE id = $5 RETURNING *',
      [name, birthdate, phone, favorite, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar contato:', err);
    res.status(500).json({ error: 'Erro ao atualizar contato' });
  }
});

// Endpoint para buscar um usuário pelo ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// Endpoint para remover um contato
app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao remover contato:', err);
    res.status(500).json({ error: 'Erro ao remover contato' });
  }
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
