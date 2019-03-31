const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/confusion';

const connect = mongoose.connect(url, {
  useNewUrlParser: true
});
connect.then(db => {
  console.log('connected to server ');
  Dishes
    .create({
      name: 'name testing mongoose',
      description: 'description testing mongoose',
      comments: [
        {
          rating: 2,
          comment: 'good',
          author: 'me'
        }
      ]
    })
    .then(dish => {
      console.log('dish ', dish);

      return Dishes.findByIdAndUpdate(dish._id,
      {
        $set: { description: ' UPDATED test'},
      }, {
          new: true
      }).exec();
    })
    .then(dish => {
      console.log('updated dish ', dish);
      dish.comments.push(
        {
          rating: 5,
          comment: 'veeery good',
          author: 'not me'
        }
      );

      return dish.save();
    })
    .then(dishes => {
      console.log('updated dishes ', dishes);

      return Dishes.deleteMany();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch(err => {
      console.log('err ', err);
    })
})
