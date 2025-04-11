// ===========================================
// 🔄 Migración de Proyecto Twitter (Firebase ➜ Azure Cosmos DB SQL API)
// ===========================================

// 📦 Dependencias necesarias (instalar con npm)
// npm install express cors dotenv @azure/cosmos

import express from 'express';
import cors from 'cors';
import { CosmosClient } from '@azure/cosmos';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ========================
// 🔑 CONFIGURACIÓN COSMOS DB
// ========================
const cosmosClient = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY
});

const databaseId = 'twitter';
const containerUsuarios = 'usuarios';
const containerTweets = 'tweets';
const containerChats = 'chats';

// ========================
// 📝 REGISTRO DE USUARIO
// ========================
app.post('/api/register', async (req, res) => {
  try {
    const { nombreUsuario, email, contraseña } = req.body;
    const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerUsuarios });

    const nuevoUsuario = {
      nombreUsuario,
      email,
      contraseña,
      creadoEn: new Date(),
      contadorTweets: 0,
      contadorSeguidores: 0,
      contadorSiguiendo: 0
    };

    await container.items.create(nuevoUsuario);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// ========================
// 🔐 INICIO DE SESIÓN
// ========================
app.post('/api/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const database = cosmosClient.database(databaseId);
    const container = database.container(containerUsuarios);

    const query = `SELECT * FROM c WHERE c.email = @email AND c.contraseña = @contraseña`;
    const { resources } = await container.items
      .query({
        query,
        parameters: [
          { name: '@email', value: email },
          { name: '@contraseña', value: contraseña }
        ]
      })
      .fetchAll();

    if (resources.length > 0) {
      res.json({ success: true, email });
    } else {
      res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// ========================
// 🐦 PUBLICAR TWEET
// ========================
app.post('/api/tweet', async (req, res) => {
  try {
    const { idUsuario, contenido, imagenes } = req.body;
    const database = cosmosClient.database(databaseId);
    const container = database.container(containerTweets);

    const nuevoTweet = {
      idUsuario,
      contenido,
      imagenes,
      creadoEn: new Date(),
      likes: 0,
      retweets: 0,
      respuestas: 0
    };

    await container.items.create(nuevoTweet);
    res.status(201).json({ message: 'Tweet publicado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al publicar el tweet' });
  }
});

// ========================
// 📥 OBTENER TWEETS
// ========================
app.get('/api/tweets', async (req, res) => {
  try {
    const database = cosmosClient.database(databaseId);
    const container = database.container(containerTweets);
    const query = 'SELECT * FROM c ORDER BY c.creadoEn DESC';

    const { resources } = await container.items.query(query).fetchAll();
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tweets' });
  }
});

// ========================
// 🚀 INICIAR SERVIDOR
// ========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
