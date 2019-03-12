const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // continue to look for more specs
  })
  .get((req, res) => {
    res.end('will send all leaders');
  })
  .post((req, res) => {
    // body is parsed with body-parser
    res.end(`will add the leader ${req.body.name} with details ${req.body.description}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on leaders');
  })
  // to be restricted later
  .delete((req, res) => {
    res.end('DELETING all leaders');
  });

  leaderRouter.route('/:leaderId')
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'text/plain');
  //   next(); // continue to look for more specs
  // })
  .get((req, res) => {
    res.end(`will send details of the leader ${req.params.leaderId}`);
  })
  .post((req, res) => {
    res.statusCode = 403; // 403 not supported
    res.end('POST operation not supported on specific leader id');
  })
  .put((req, res) => {
    res.write(`Updating leader ${req.params.leaderId} `);
    res.end(`will update the details of the leader ${req.body.name} ${req.params.leaderId}`);
  })
  .delete((req, res) => {
    res.end(`Will delete leader ${req.params.leaderId}`);
  });

  module.exports = leaderRouter;
