const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/confusion';

const connect = mongoose.connect(url, {
  useNewUrlParser: true
});
connect.then(db => {
  console.log('connected to server ');
  const newDish = Dishes({
    name: 'name testing mongoose',
    description: 'description testing mongoose',
  });

  newDish.save()
    .then(dish => {
      console.log('dish ', dish);

      return Dishes.find({}).exec();
    })
    .then(dishes => {
      console.log('dishes ', dishes);

      return Dishes.deleteMany();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch(err => {
      console.log('err ', err);
    })
})
