const assert = require('assert');

exports.insertDoument = (db, doc, collection, collback) => {
  const coll = db.collection(collection);
  coll.insert(doc, (err, res) => {
    assert.equal(err, null);
    console.log(`Inserted result ${res.result.n} documents in the ${collection}`);
    callback(result);
  })
}

exports.findDouments = (db, collection, collback) => {
  const coll = db.collection(collection);
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    collback(docs);
  })
}

exports.removeDoument = (db, doc, collection, collback) => {
  const coll = db.collection(collection);
  coll.deleteOne(doc, (err, res) => {
    assert.equal(err, null);
    console.log(`Removed the document ${doc}`);
    callback(result);
  })
}

exports.updateDoument = (db, doc, update, collection, collback) => {
  const coll = db.collection(collection);
  coll.updateOne(doc, { $set: update}, null, (err, res) => {
    assert.equal(err, null);
    console.log(`Updated the document ${doc} with ${update}`);
  })
}
