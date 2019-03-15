const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // continue to look for more specs
  })
  .get((req, res) => {
    res.end('will send all dishes');
  })
  .post((req, res) => {
    // body is parsed with body-parser
    res.end(`will add the dish ${req.body.name} with details ${req.body.description}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on dishes');
  })
  // to be restricted later
  .delete((req, res) => {
    res.end('DELETING all dishes');
  });

  dishRouter.route('/:dishId')
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'text/plain');
  //   next(); // continue to look for more specs
  // })
  .get((req, res) => {
    res.end(`will send details of the dish ${req.params.dishId}`);
  })
  .post((req, res) => {
    res.statusCode = 403; // 403 not supported
    res.end('POST operation not supported on specific dish id');
  })
  .put((req, res) => {
    res.write(`Updating dish ${req.params.dishId} `);
    res.end(`will update the details of the dish ${req.body.name} ${req.params.dishId}`);
  })
  .delete((req, res) => {
    res.end(`Will delete dish ${req.params.dishId}`);
  });

  module.exports = dishRouter;
