const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null); // assert if err is equal to null, e.g. check
  console.log('Connected to server');

  const db = client.db(dbname);
  const docToInsert = {
    "name": "New Dish",
    "description": "Initial test"
  }
  dboper.insertDocument(db, docToInsert, 'dishes', res => {
    console.log(`Insert document:\n ${JSON.stringify(res.ops)}`);

    dboper.findDocuments(db, 'dishes', res => {
      console.log(`Documents found:\n ${JSON.stringify(res)}`);

      dboper.updateDocument(db, {"name": "New Dish"}, {"description": "Updated test"}, 'dishes', res => {
        console.log(`Document updated:\n ${JSON.stringify(res)}`);

        dboper.removeDocument(db, {"name": "New Dish"}, 'dishes', res => {
          console.log(JSON.stringify(res));

             dboper.findDocuments(db, 'dishes', res => {
                console.log(`Documents found after all:\n ${JSON.stringify(res)}`);

                db.dropCollection('dishes', res => {
                  console.log(JSON.stringify(res));

                  client.close();
                })
             })
        })
      })
    });
  });

  // const collection = db.collection('dishes');

  // collection.insertOne({ "name": "New Dish", "description": "New test"}, (err, result) => {
  //   assert.equal(err, null);
  //   console.log('After insert:\n');
  //   console.log(result.ops);

  //   // search all objects
  //   collection.find({}).toArray((err, docs) => {
  //     assert.equal(err, null);
  //     console.log('Found:\n');
  //     console.log(docs);

  //     db.dropCollection('dishes', (err, result) => {
  //       assert.equal(err, null);

  //       client.close();
  //     })
  //   });
  // });
})
