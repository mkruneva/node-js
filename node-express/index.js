const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/dishes/:dishId', (req, res) => {
  res.end(`will send details of the dish ${req.params.dishId}`);
});

app.post('/dishes/:dishId', (req, res) => {
  res.statusCode = 403; // 403 not supported
  res.end('POST operation not supported on specific dish id');
});

app.put('/dishes/:dishId', (req, res) => {
  res.write(`Updating dish ${req.params.dishId} `);
  res.end(`will update the details of the dish ${req.body.name} ${req.params.dishId}`);
});

app.delete('/dishes/:dishId', (req, res) => {
  res.end(`Will delete dish ${req.params.dishId}`);
});

app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body<<h1>Express Server</h1></body</html>');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});
