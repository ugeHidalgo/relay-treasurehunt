import Mongoose from '../mongoose/mongodb-driver.js';

var athletecompSchema = new Mongoose.Schema ({
  athleteId: { type: String, required: true },
  compId: { type: String, required: true }
});

var Athletecomp = Mongoose.model('athletecomp',athletecompSchema);

export default Athletecomp;
