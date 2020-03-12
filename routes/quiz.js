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

  // 2 variables to check wether the final result is bigger or smaller then 50 and then send this to the view, so we can render the correct message
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
router.post('/:quizId/:userId', async (req, res, next) => {
  const { answer } = req.body;
  const { quizId, userId } = req.params;
  const questionWithNumber = 'question' + quizId;

  try {
    await User.findByIdAndUpdate(userId, { [questionWithNumber]: answer, $inc: { sum: answer } });
    res.redirect(`/quiz/answer/${quizId}/${userId}`);
  } catch (error) {
    next(error);
  }
});

// rendering each answer
router.get('/answer/:quizId/:userId', async (req, res, next) => {
  const { quizId, userId } = req.params;

  //render the info related to each answer
  const quiz = quizInformation[quizId - 1];

  //creates the variable which is the name of the property to save the user's answer into the db
  const questionWithNumber = 'question' + quizId;

  // function to verify if the user's answer was the correct one

  const user = await User.findById(userId);
  const isAnswerRight = user[questionWithNumber] === 20;
  res.render('quiz/answer', { user, quiz, isAnswerRight });
});

module.exports = router;
