const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, {
  useNewUrlParser: true
})
.then(client => {
  console.log('Connected to server');

  const db = client.db(dbname);
  const docToInsert = {
    "name": "New Dish",
    "description": "Initial test"
  }
  dboper.insertDocument(db, docToInsert, 'dishes')
    .then(res => {
      console.log(`Insert document:\n ${JSON.stringify(res.ops)}`);
      return dboper.findDocuments(db, 'dishes');
    })
    .then(res => {
      console.log(`Documents found:\n ${JSON.stringify(res)}`);
      return dboper.updateDocument(db, {"name": "New Dish"}, {"description": "Updated test"}, 'dishes');
    })
    .then(res => {
      console.log(`Document updated:\n ${JSON.stringify(res)}`);
      return dboper.removeDocument(db, {"name": "New Dish"}, 'dishes');
    })
    .then(res => {
      console.log(JSON.stringify(res));
      return dboper.findDocuments(db, 'dishes');
    })
    .then(res => {
      console.log(`Documents found after all:\n ${JSON.stringify(res)}`);
      return db.dropCollection('dishes');
    })
    .then(res => {
      console.log(JSON.stringify(res));
      client.close();
    })
})
.catch(err => console.log('err ', err));
