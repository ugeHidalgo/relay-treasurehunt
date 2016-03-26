import Mongoose from '../mongoose/mongodb-driver.js';

var competitionSchema = new Mongoose.Schema ({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true }
});

var Competition = Mongoose.model('Competition',competitionSchema);

export default Competition;
