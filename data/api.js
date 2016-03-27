import Athlete from './models/athlete';
import Competition from './models/competition';
import Lodash from 'lodash';

// Model types
class FakeAthlete {}
class FakeCompetition {}


let fakeAthletes = [];
let fakeAthlete = new FakeAthlete();
fakeAthlete._id = '1';
fakeAthlete.lastName = 'Jordan';
fakeAthlete.firstName = 'Michael';
fakeAthletes.push(fakeAthlete);

let fakeAthlete2 = new FakeAthlete();
fakeAthlete2._id = '2';
fakeAthlete2.lastName = 'Jordan';
fakeAthlete2.firstName = 'Michael';
fakeAthletes.push(fakeAthlete2);


let fakeCompetitions = [];
let comp1 = new FakeCompetition();
comp1._id = '1';
comp1.name = '(Fake)Triatlón Pikaeras Almuñecar';
comp1.type = 'Triatlón Sprint';
comp1.city = 'Almuñecar';
comp1.country = 'Spain';
comp1.athleteId = '1';
fakeCompetitions.push(comp1);

let comp2 = new FakeCompetition();
comp2._id = '2';
comp2.name = '(Fake)Ironman Nice';
comp2.type = 'Triatlón Ironman';
comp2.city = 'Nice';
comp2.country = 'France';
comp2.athleteId = '1';
fakeCompetitions.push(comp2);

let comp3 = new FakeCompetition();
comp3._id = '3';
comp3.name = '(Fake)Triatlón Titán';
comp3.type = 'Triatlón Half';
comp3.city = 'Algodonales';
comp3.country = 'Spain';
comp3.athleteId = '2';
fakeCompetitions.push(comp3);


module.exports = {

  getStore: () => {
    return fakeAthlete;
  },

  getAthlete: (id) => {
     console.log('Get athlete with id : '+ id);
    return Athlete.find({"id": id});
    //return fakeAthlete;
  },

  getAthletes: () => {
    return Athlete.find();
    //return fakeAthletes;
  },

  getCompetition: (id) => {
    //return db.collection('athletes').find(athlete => athlete.id === "QXRobGV0ZTo0");
    //return db.collection('competitions')[0];
    //return fakeCompetitions[0];

    var competitionsPromise = Competition.find({"athleteId":id}).exec();
    competitionsPromise.then(function(result){
        console.log (result);
        return result;
      });
  },

  getAllCompetitions: () => {
    return Competition.find();
  },

  getCompetitions: (athleteId )=> {

    console.log('Getting competitions for athletId: '+ athleteId);
    if (athleteId===null || athleteId==='all' || athleteId===undefined) {
      return Competition.find();
    }

    return Competition.find({"athleteId":athleteId});

    // var competitionsPromise = Competition.find({}).exec();
    //
    // competitionsPromise.then(function(result){
    //     console.log (result);
    //     return result;
    // });

    // db.collection('competitions').find().forEach(function(comp){
    //   comps.push(comp);
    // });
    //return comps;

    // let comps = [];
    // let athleteId = 1;
    // fakeCompetitions.forEach(function(comp){
    //   if (comp.athleteId == athleteId){
    //     comps.push(comp);
    //   }
    // });
    // return comps;
  },

  Athlete,

  Competition,
}
