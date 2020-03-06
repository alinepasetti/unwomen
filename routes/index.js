'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/create-user', (req, res, next) => {
  const { name } = req.body;
  User.create({ name })
    .then(user => {
      res.redirect(`/quiz/question1/${user._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
