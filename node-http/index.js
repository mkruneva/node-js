// const http = require('http');
import http from 'http';

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.headers);

  const htmlRes = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>HELLO</title>
    </head>
    <body>

    </body>
  </html>
  `
  res.statusCode = 200;
  res.setHeader('Content-type', 'text-html');
  res.done(htmlRes);
});
