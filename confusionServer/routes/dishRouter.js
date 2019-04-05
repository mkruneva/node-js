const express = require('express');
const bodyParser = require('body-parser');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
  .get((req, res) => {
    Dishes.find({})
      .then(dishes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
      })
      .catch(err => console.log(err));
  })
  .post((req, res) => {
    Dishes.create(req.body)
      .then(dish => {
        console.log('create dish', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      })
      .catch(err => {
        res.statusCode = 400;
        res.json(err);
      });
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on dishes');
  })
  // to be restricted later
  .delete((req, res) => {
    // Dishes.remove({})
    Dishes.remove({})
      .then(res => {
        console.log('deleting all dishes', res);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(res);
      })
      .catch(err => next(err));
  });

  dishRouter.route('/:dishId')
  .get((req, res) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(res);
      })
      .catch(err => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403; // 403 not supported
    res.end('POST operation not supported on specific dish id');
  })
  .put((req, res) => {
    Dishes.findByIdAndUpdate(
        req.params.dishId,
        { $set: req.body },
        { new: true }
      )
      .then(res => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(res);
      })
      .catch(err => next(err));
  })
  .delete((req, res) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then(res => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(res);
      })
      .catch(err => next(err));
  });

  module.exports = dishRouter;
