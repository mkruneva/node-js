const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const htmlRes = text => `
  <html>
    <head>
      <meta charset="UTF-8">
      <title>ERROR</title>
    </head>
    <body>
      <h1>${text}</h1>
    </body>
  </html>
`

const server = http.createServer((req, res) => {
  console.log('Request for ', req.url, ' method: ', req.method);

  if (req.method === 'GET') {
    let fileUrl;
    if (req.url === '/') fileUrl = 'index.html';
    else fileUrl = req.url;

    let filePath = path.resolve(`./public/${fileUrl}`);
    const fileExt = path.extname(filePath);
    if (fileExt === '.html') {
      fs.exists(filePath, exists => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader('Content-type', 'text-html');
          res.end(htmlRes('file does not exist'));
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-type', 'text-html');

        fs.createReadStream(filePath).pipe(res);
        return;
      })
    } else {
      res.statusCode = 404;
      res.setHeader('Content-type', 'text-html');
      res.end('file ext not html');
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-type', 'text-html');
    res.end('not get');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
})
