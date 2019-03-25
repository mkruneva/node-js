exports.insertDocument = (db, doc, collection) => {
  const coll = db.collection(collection);
  return coll.insertOne(doc);
}

exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
}

exports.removeDocument = (db, doc, collection, callback) => {
  const coll = db.collection(collection);
  return coll.deleteOne(doc)
}

exports.updateDocument = (db, doc, update, collection, callback) => {
  const coll = db.collection(collection);
  return coll.updateOne(doc, { $set: update}, null);
}
