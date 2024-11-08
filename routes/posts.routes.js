const express = require('express');
const router = express.Router();
// //const db = require('./../db');
// //const ObjectId = require('mongodb').ObjectId;
const PostsControllers = require('../controllers/posts.controller');

router.get('/posts', PostsControllers.getAll);

router.get('/posts/:id', PostsControllers.getById);

router.post('/posts', PostsControllers.postAd);

router.put('/posts/:id', PostsControllers.putAd);

router.delete('/posts/delete', PostsControllers.deleteAd);

router.get('/posts/search/:searchPhrase', PostsControllers.searchPhrase);

// router.get('/employees/random', EmployeesControllers.getRandom);

// router.post('/employees', EmployeesControllers.post);

// router.put('/employees/:id', EmployeesControllers.put);

// router.delete('/employees/:id', EmployeesControllers.delete);

// • GET /api/ads – który zwróci wszystkie ogłoszenia,
// • GET /api/ads/:id – który zwróci konkretne ogłoszenie,
// • POST /api/ads – do dodawania nowego ogłoszenia,
// • DELETE /api/ads/:id – do usuwania ogłoszenia,
// • PUT lub PATCH /api/ads/:id – do edycji ogłoszenia,
// • GET /api/ads/search/:searchPhrase – który zwróci ogłoszenia pasujące tytułem do podanej frazy,
// • POST /auth/register – do rejestracji nowego użytkownika,
// • POST /auth/login – do weryfikacji użytkownika i utworzenia sesji,
// • GET /auth/user – zwracający informację o aktualnie zalogowanym użytkowniku.

module.exports = router;