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
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      })
      .catch(err => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403; // 403 not supported
    res.end('POST operation not supported on specific dish id');
  })
  .put((req, res, next) => {
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
  .delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then(res => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(res);
      })
      .catch(err => next(err));
  });

dishRouter.route('/:dishId/comments')
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dish.comments);
        } else {
          const err = new Error(`Dish ${req.params.dishId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => console.log(err));
  })
  .post((req, res) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
          if (dish) {
            dish.comments.push(req.body);
            dish.save().then(dish =>{
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(dish);
            });
          } else {
            const err = new Error(`Dish ${req.params.dishId} not found`);
            err.status = 404;
            return next(err);
          }
        })
        .catch(err => console.log(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on comments');
  })
  // to be restricted later
  .delete((req, res) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish) {
          dish.comments.map(c => c._id.remove());
          dish.save().then(dish => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
          });
        } else {
          const err = new Error(`Dish ${req.params.dishId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => console.log(err));
  });

dishRouter.route('/:dishId/comments/:commentId')
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish && dish.comments.id(req.params.commentId)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dish.commetns.id(req.params.commentId));
        } else if (!dish) {
          const err = new Error(`Dish ${req.params.dishId} not found`);
          err.status = 404;
          return next(err);
        } else {
          const err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403; // 403 not supported
    res.end('POST operation not supported on specific comment id');
  })
  .put((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish && dish.comments.id(req.params.commentId)) {
          req.body.rating && (dish.comments.id(req.params.commentId).rating = req.body.rating);
          req.body.comment && (dish.comments.id(req.params.commentId).comment = req.body.rating);
          dish.save().then(dish => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
          });
        } else if (!dish) {
          const err = new Error(`Dish ${req.params.dishId} not found`);
          err.status = 404;
          return next(err);
        } else {
          const err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish && dish.comments.id(req.params.commentId)) {
          dish.comments.id(req.params.commentId).remosve();
          dish.save();
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dish);
        } else if (!sdish) {
          const err = new Error(`Dish ${req.params.dishId} not found`);
          err.status = 404;
          return next(err);
        } else {
          const err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  });

  module.exports = dishRouter;
