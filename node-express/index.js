const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {


app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body<<h1>Express Server</h1></body</html>')
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
})
