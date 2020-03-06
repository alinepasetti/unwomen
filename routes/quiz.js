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
      const isAnswerRight = user.question1 === 20;

      res.render('quiz/answer', { user, isAnswerRight, quiz1 });
    })
    .catch(error => {
      next(error);
    });
});

//render da question 2
router.get('/question2/:id', (req, res, next) => {
  const quiz1 = quiz[1];
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.render('quiz/question', { user, quiz1 });
    })
    .catch(error => {
      next(error);
    });
});

//route que computa a resposta para a question 2
router.post('/question2/:id', (req, res, next) => {
  const { question2 } = req.body;
  const { id } = req.params;

  User.findByIdAndUpdate(id, { question2 })
    .then(() => {
      res.redirect(`/quiz/answer2/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

// render da resposta 2
router.get('/answer2/:id', (req, res, next) => {
  const { id } = req.params;
  const quiz1 = quiz[1];
  User.findById(id)
    .then(user => {
      const { result } = req.body;
      // função para verificar se a questão escolhida pelo user é a correta. Para os próximos é preciso alterar o número da question e o valor
      const isAnswerRight = user.question2 === 20;

      res.render('quiz/answer', { user, isAnswerRight, quiz1 });
    })
    .catch(error => {
      next(error);
    });
});

//render da question 3
router.get('/question3/:id', (req, res, next) => {
  const quiz1 = quiz[2];
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.render('quiz/question', { user, quiz1 });
    })
    .catch(error => {
      next(error);
    });
});

//route que computa a resposta para a question 3
router.post('/question3/:id', (req, res, next) => {
  const { question3 } = req.body;
  const { id } = req.params;

  User.findByIdAndUpdate(id, { question3 })
    .then(() => {
      res.redirect(`/quiz/answer3/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

// render da resposta 3
router.get('/answer3/:id', (req, res, next) => {
  const { id } = req.params;
  const quiz1 = quiz[2];
  User.findById(id)
    .then(user => {
      const { result } = req.body;
      // função para verificar se a questão escolhida pelo user é a correta. Para os próximos é preciso alterar o número da question e o valor
      const isAnswerRight = user.question3 === 20;

      res.render('quiz/answer', { user, isAnswerRight, quiz1 });
    })
    .catch(error => {
      next(error);
    });
});

//render da question 4
router.get('/question4/:id', (req, res, next) => {
  const quiz1 = quiz[3];
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.render('quiz/question', { user, quiz1 });
    })
    .catch(error => {
      next(error);
    });
});

//route que computa a resposta para a question 4
router.post('/question4/:id', (req, res, next) => {
  const { question4 } = req.body;
  const { id } = req.params;

  User.findByIdAndUpdate(id, { question4 })
    .then(() => {
      res.redirect(`/quiz/answer4/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

// render da resposta 4
router.get('/answer4/:id', (req, res, next) => {
  const { id } = req.params;
  const quiz1 = quiz[3];
  User.findById(id)
    .then(user => {
      const { result } = req.body;
      // função para verificar se a questão escolhida pelo user é a correta. Para os próximos é preciso alterar o número da question e o valor
      const isAnswerRight = user.question4 === 20;

      res.render('quiz/answer', { user, isAnswerRight, quiz1 });
    })
    .catch(error => {
      next(error);
    });
});

//render da question 5
router.get('/question5/:id', (req, res, next) => {
  const quiz1 = quiz[4];
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.render('quiz/question', { user, quiz1 });
    })
    .catch(error => {
      next(error);
    });
});

//route que computa a resposta para a question 2
router.post('/question5/:id', (req, res, next) => {
  const { question5 } = req.body;
  const { id } = req.params;
  User.findByIdAndUpdate(id, { question5 })
    .then(user => {
      const sum =
        user.question1 + user.question2 + user.question3 + user.question4 + Number(question5);

      return User.findByIdAndUpdate(id, { sum });
    })
    .then(() => {
      res.redirect(`/quiz/answer5/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

// render da resposta 5
router.get('/answer5/:id', (req, res, next) => {
  const { id } = req.params;
  const quiz1 = quiz[4];
  User.findById(id)
    .then(user => {
      const { result } = req.body;
      // função para verificar se a questão escolhida pelo user é a correta. Para os próximos é preciso alterar o número da question e o valor
      const isAnswerRight = user.question5 === 20;

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

  User.findById(id)
    .then(doc => {
      user = doc;
      // não está funcionando este sort, mas é QUASE ISSO
      return User.find({}, null, { sort: { sum: -1 } }).limit(10);
    })
    .then(users => {
      const moreThan50 = user.sum > 50;
      console.log(moreThan50);
      res.render('quiz/result', { user, users, moreThan50 });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
