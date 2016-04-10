import Mongoose from '../mongoose/mongodb-driver.js';

var competitionSchema = new Mongoose.Schema ({
  id: { type: String },
  _id: { type: String },
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String },
  city: { type: String },
  country: { type: String }
});

var Competition = Mongoose.model('competition',competitionSchema);

export default Competition;
