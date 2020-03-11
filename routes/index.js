'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/create-user', async (req, res, next) => {
  const { name } = req.body;
  const user = await User.create({ name });
  res.redirect(`/quiz/1/${user._id}`);
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
