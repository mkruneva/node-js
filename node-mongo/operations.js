const assert = require('assert');

exports.insertDocument = (db, doc, collection, callback) => {
  const coll = db.collection(collection);
  coll.insertOne(doc, (err, res) => {
    assert.equal(err, null);
    console.log(`Inserted result :${JSON.stringify(res.result.n)} documents in the ${JSON.stringify(collection)}`);
    callback(res);
  })
}

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  })
}

exports.removeDocument = (db, doc, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(doc, (err, res) => {
    assert.equal(err, null);
    console.log(`Removed the document ${JSON.stringify(doc)}`);
    callback(res);
  })
}

exports.updateDocument = (db, doc, update, collection, callback) => {
  const coll = db.collection(collection);
  coll.updateOne(doc, { $set: update}, null, (err, res) => {
    assert.equal(err, null);
    console.log(`Updated the document ${JSON.stringify(doc)} with ${JSON.stringify(update)}`);
    callback(res);
  })
}
