'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');
const quiz = require('./../quiz.json');

//render da question 1
router.get('/question1/:id', (req, res, next) => {
  let quiz1 = quiz[0];
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      console.log(user);
      res.render('quiz/question', { user, quiz1 });
    })
    .catch(error => {
      next(error);
    });
});

//route que computa a resposta para a question 1
router.post('/question1/:id', (req, res, next) => {
  const { question1 } = req.body;
  const { id } = req.params;

  User.findByIdAndUpdate(id, { question1 })
    .then(() => {
      res.redirect(`/quiz/answer1/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

// render da resposta 1
router.get('/answer1/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      // função para verificar se a questão escolhida pelo user é a correta. Para os próximos é preciso alterar o número da question e o valor
      const isAnswerRight = user.question1 === 2;

      console.log(user);
      res.render('quiz/answer', { user, isAnswerRight });
    })
    .catch(error => {
      next(error);
    });
});

// render do resultado final
router.get('/result/:id', (req, res, next) => {
  let user;
  const { id } = req.params;
  User.findById(id)
    .then(doc => {
      user = doc;
      // não está funcionando este sort, mas é QUASE ISSO
      return User.find({ limit: 10 });
    })
    .then(users => {
      console.log(users);
      res.render('quiz/result', { user, users });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
