const http = require('http');
// import http from 'http';

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.headers);

  const htmlRes = `
  <html>
    <head>
      <meta charset="UTF-8">
      <title>HELLO</title>
    </head>
    <body>
      <h1>Hello!</h1>
    </body>
  </html>
  `
  res.statusCode = 200;
  res.setHeader('Content-type', 'text-html');
  res.end(htmlRes);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
})
