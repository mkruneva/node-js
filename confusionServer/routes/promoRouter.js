const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // continue to look for more specs
  })
  .get((req, res) => {
    res.end('will send all promotions');
  })
  .post((req, res) => {
    // body is parsed with body-parser
    res.end(`will add the promotion ${req.body.name} with details ${req.body.description}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on promotions');
  })
  // to be restricted later
  .delete((req, res) => {
    res.end('DELETING all promotions');
  });

  promoRouter.route('/:promoId')
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'text/plain');
  //   next(); // continue to look for more specs
  // })
  .get((req, res) => {
    res.end(`will send details of the promotion ${req.params.promoId}`);
  })
  .post((req, res) => {
    res.statusCode = 403; // 403 not supported
    res.end('POST operation not supported on specific promotion id');
  })
  .put((req, res) => {
    res.write(`Updating promotion ${req.params.promoId} `);
    res.end(`will update the details of the promotion ${req.body.name} ${req.params.promoId}`);
  })
  .delete((req, res) => {
    res.end(`Will delete promotion ${req.params.promoId}`);
  });

  module.exports = promoRouter;
