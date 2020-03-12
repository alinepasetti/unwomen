'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Blog = require('./../models/Blog');

router.get('/', (req, res, next) => {
  Blog.find()
    .then(blogs => {
      res.render('blog/list', { blogs });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create-a-beautiful-post', (req, res, next) => {
  res.render('blog/create');
});

router.post('/create', (req, res, next) => {
  const { title, img, category, video } = req.body;
  const data = {
    title,
    img,
    category,
    video
  };
  Blog.create(data)
    .then(() => {
      res.redirect('/blog');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
