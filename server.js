const express = require('express');
const cors = require('cors');
const app = express(); 
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');
const usersAuth = require('./routes/auth.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public/images')));

app.use('/api', postsRoutes);
app.use('/api', usersRoutes);
app.use('/auth', usersAuth);

// • GET /api/ads – który zwróci wszystkie ogłoszenia,
// • GET /api/ads/:id – który zwróci konkretne ogłoszenie,
// • POST /api/ads – do dodawania nowego ogłoszenia,
// • DELETE /api/ads/:id – do usuwania ogłoszenia,
// • PUT lub PATCH /api/ads/:id – do edycji ogłoszenia,
// • GET /api/ads/search/:searchPhrase – który zwróci ogłoszenia pasujące tytułem do podanej frazy,
// • POST /auth/register – do rejestracji nowego użytkownika,
// • POST /auth/login – do weryfikacji użytkownika i utworzenia sesji,
// • GET /auth/user – zwracający informację o aktualnie zalogowanym użytkowniku.

app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
});

const dbUri = 'mongodb://0.0.0.0:27017/postsDB';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

console.log('Succesfully connected to the database');