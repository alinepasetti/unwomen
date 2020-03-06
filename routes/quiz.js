'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');
const quiz = require('./../quiz.json');

//render da question 1
router.get('/question1/:id', (req, res, next) => {
  const quiz1 = quiz[0];
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
  const quiz1 = quiz[0];
  User.findById(id)
    .then(user => {
      const { result } = req.body;
      // função para verificar se a questão escolhida pelo user é a correta. Para os próximos é preciso alterar o número da question e o valor
      const isAnswerRight = user.question1 === 2;

      console.log(user);
      res.render('quiz/answer', { user, isAnswerRight, quiz1 });
    })
    .catch(error => {
      next(error);
    });
});

// render do resultado final
router.get('/result/:id', (req, res, next) => {
  let user;
  const { id } = req.params;
  const sum = 0;

  User.findById(id)
    .then(doc => {
      user = doc;
      // não está funcionando este sort, mas é QUASE ISSO
      return User.find({}, null, { sort: { sum: -1 } }).limit(10);
    })
    .then(users => {
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

// Código que foi utilizado para a questão 5
/* 
//render da question 5
router.get('/question5/:id', (req, res, next) => {
  let quiz1 = quiz[4];
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

//route que computa a resposta para a question 5 e atualiza a sum
router.post('/question5/:id', (req, res, next) => {
  const { question5 } = req.body;
  const { id } = req.params;
  console.log(question5, typeof question5);
  //Update da question find no user

  User.findByIdAndUpdate(id, { question5 }).then(user => {
    console.log('This is the user', user);
  });

  /*  
      const sum =
        user.question1 + user.question2 + user.question3 + user.question4 + Number(question5);
      const data = { sum, question5 };
      console.log(sum);
      console.log(data);
      //return user.findByIdAndUpdate(user._id, data);
    })
    .then(user => {
      console.log(user);
      res.redirect('/result/:id');
    }); 
}); */
