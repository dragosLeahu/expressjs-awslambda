const {
  ObjectID
} = require('mongodb');
const MongoPool = require('../db');

module.exports.create = (req, callback) => {
  MongoPool.getCollection('notes', function(collection) {
    collection.insertOne(req.body, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response);
      }
    });
  })
};

module.exports.getAll = (callback) => {
  MongoPool.getCollection('notes', function(collection) {
    collection.find({}).toArray((error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response);
      }
    });
  })
};

module.exports.getOne = (req, callback) => {
  MongoPool.getCollection('notes', function(collection) {
    collection.find({
      _id: ObjectID(req.params.id),
    }).toArray((error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response);
      }
    });
  })
};

module.exports.update = (req, callback) => {
  MongoPool.getCollection('notes', function(collection) {
    collection.findOneAndUpdate({
        _id: ObjectID(req.params.id),
      }, {
        $set: req.body,
      }, {
        returnOriginal: false,
      },
      (error, response) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, response);
        }
      });
  })
};

module.exports.delete = (req, callback) => {
  MongoPool.getCollection('notes', function(collection) {
    collection.findOneAndDelete({
      _id: ObjectID(req.params.id),
    }, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response);
      }
    });
  })
};