import Mongoose from 'mongoose';

var uri = process.env.MONGO_URL;

Mongoose.connect(uri);
var db= Mongoose.connection;
db.on('error',console.error.bind(console,'Connection error to MongoDb'));
db.once('open', function () {
    console.log ('Connection to MongoDb via Moongoose successfully done!!!.')
});

export default Mongoose;
