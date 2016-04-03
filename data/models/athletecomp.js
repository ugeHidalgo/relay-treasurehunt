import Mongoose from '../mongoose/mongodb-driver.js';

var athletecompSchema = new Mongoose.Schema ({
  // id: { type: String, required: true },
  // _id: { type: String, required: true },
  athleteId: { type: String, required: true },
  compId: { type: String, required: true }
});

var Athletecomp = Mongoose.model('athletecomp',athletecompSchema);

export default Athletecomp;
