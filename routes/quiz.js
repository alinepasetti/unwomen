'use strict';

const { Router } = require('express');
const router = new Router();
const User = require('../models/user');
const quizInformation = require('./../quiz.json');

// render do resultado final
router.get('/result/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  // sort in the users DB to find the top ten players
  const topTenUsers = await User.find({}, null, { sort: { sum: -1 } }).limit(10);
  console.log(topTenUsers);
  const moreThan50 = user.sum > 50;
  const score100 = user.sum == 100;
  res.render('quiz/result', { topTenUsers, user, moreThan50, score100 });
});

// rendering the questions
router.get('/:quizId/:userId', async (req, res, next) => {
  // get the quizNumber and user id from the params
  const { quizId, userId } = req.params;

  // collect the quiz information from the DB and save it in a variable
  const quiz = quizInformation[quizId - 1];

  // const user = await User.findById(userId);

  // 1 render the question view
  // 2 send the userId to the view so the link maintains the user info
  // 3 send the quiz info to the view so the info is rendered
  res.render('quiz/question', { userId, quiz });
});

// post route to save the user's response for each question and increment the sum
router.post('/:quizId/:userId', (req, res, next) => {
  const { answer } = req.body;
  const { quizId, userId } = req.params;
  const questionWithNumber = 'question' + quizId;

  User.findByIdAndUpdate(userId, { [questionWithNumber]: answer, $inc: { sum: answer } })
    .then(() => {
      res.redirect(`/quiz/answer/${quizId}/${userId}`);
    })
    .catch(error => {
      next(error);
    });
});

// rendering each answer
router.get('/answer/:quizId/:userId', (req, res, next) => {
  const { quizId, userId } = req.params;
  const quiz = quizInformation[quizId - 1];
  const questionWithNumber = 'question' + quizId;

  User.findById(userId)
    .then(user => {
      // função para verificar se a questão escolhida pelo user é a correta. Para os próximos é preciso alterar o número da question e o valor
      const isAnswerRight = user[questionWithNumber] === 20;

      res.render('quiz/answer', { user, quiz, isAnswerRight });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
