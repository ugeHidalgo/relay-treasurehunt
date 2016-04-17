import Athlete from './models/athlete';
import Competition from './models/competition';
import Athletecomp from './models/athletecomp';
import Lodash from 'lodash';

module.exports = {

  getStore: () => {
    console.log('Get all athletes.');
    return Athlete.find({});
    //return fakeAthlete;
  },

  getAthletes: (firstName) => {

    if (firstName==undefined) {
      console.log('Get all athletes.');
      return Athlete.find({});
    }

    console.log('Get athlete with firstName : '+ firstName);
    return Athlete.find({firstName:firstName});
  },

  getCompetition: (id) => {
    //return db.collection('athletes').find(athlete => athlete.id === "QXRobGV0ZTo0");
    //return db.collection('competitions')[0];
    //return fakeCompetitions[0];

    // var competitionsPromise = Competition.find({"athleteId":id}).exec();
    // competitionsPromise.then(function(result){
    //     console.log (result);
    //     return result;
    //   });
  },

  insertCompetition: (_id,name,type,date,city,country) => {
    console.log('Inserting competition : {'+_id+'-'+name+'-'+type+'}');
    let newComp = new Competition({
      _id : _id,
      id : _id,
      name: name,
      type: type,
      date: date,
      city: city,
      country: country
    });
    return newComp.save(function(err){
      if (err) {
        console.log('Error saving competition.');
        return console.log(err);
      }
      console.log('Competition successfully saved!!');
    });
  },

  getAllCompetitions: () => {
    console.log('Getting all competitions.');
    var compsPromise = Competition.find({}).exec();
    return compsPromise.then(function (result) {
      //console.log(result);
      return result;
    });
  },

  getAthleteCompetitions: ( athleteId )=> {
    console.log('----getAthleteCompetitions('+athleteId+')------');
    if (athleteId===null || athleteId==='all' || athleteId===undefined) {
      console.log('Getting all competitions.');
      var compsPromise = Competition.find({}).exec();
      //var results = compsPromise.then(function (result) {
      return compsPromise.then(function (result) {
        console.log(result);
        return result;
      });
    }

    var comps=[];
    var athletecompsPromise = Athletecomp.find({ athleteId: athleteId}).exec();
    var a =athletecompsPromise.then(function(athleteComps){

      athleteComps.forEach(function(atheteComp){
        comps.push(atheteComp.compId);
      });

      return comps;

     }).then(function(comps){

        console.log('Competitions for athlete('+ athleteId + '): [' + comps + ']');
        console.log('-------------------------------------------');
        var compsPromise = Competition.find({id:{ $in: comps }}).exec();
        var results = compsPromise.then (function(competitions){
          console.log(competitions);
          return competitions;
        });
        return results;
     });
     return a; //Todo: need to refactor the way of returning promises
  },

  Athlete,
  Competition,
}
