import Mongoose from '../mongoose/mongodb-driver.js';

var athleteSchema = new Mongoose.Schema ({
  id: { type: String, required: true },
  _id: { type: String, required: true },
  athleteId: { type: String, required: true },
  dni: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  tlf: { type: String, required: true },
  sex: { type: String, required: true }
});

var Athlete = Mongoose.model('athlete',athleteSchema);

export default Athlete;
