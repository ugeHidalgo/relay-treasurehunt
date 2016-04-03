import Athlete from './models/athlete';
import Competition from './models/competition';
import Athletecomp from './models/athletecomp';
import Lodash from 'lodash';

// Model types
// class FakeAthlete {}
// class FakeCompetition {}
//
//
// let fakeAthletes = [];
// let fakeAthlete = new FakeAthlete();
// fakeAthlete._id = '1';
// fakeAthlete.lastName = 'Jordan';
// fakeAthlete.firstName = 'Michael';
// fakeAthletes.push(fakeAthlete);
//
// let fakeAthlete2 = new FakeAthlete();
// fakeAthlete2._id = '2';
// fakeAthlete2.lastName = 'Jordan';
// fakeAthlete2.firstName = 'Michael';
// fakeAthletes.push(fakeAthlete2);
//
//
// let fakeCompetitions = [];
// let comp1 = new FakeCompetition();
// comp1._id = '1';
// comp1.name = '(Fake)Triatlón Pikaeras Almuñecar';
// comp1.type = 'Triatlón Sprint';
// comp1.city = 'Almuñecar';
// comp1.country = 'Spain';
// comp1.athleteId = '1';
// fakeCompetitions.push(comp1);
//
// let comp2 = new FakeCompetition();
// comp2._id = '2';
// comp2.name = '(Fake)Ironman Nice';
// comp2.type = 'Triatlón Ironman';
// comp2.city = 'Nice';
// comp2.country = 'France';
// comp2.athleteId = '1';
// fakeCompetitions.push(comp2);
//
// let comp3 = new FakeCompetition();
// comp3._id = '3';
// comp3.name = '(Fake)Triatlón Titán';
// comp3.type = 'Triatlón Half';
// comp3.city = 'Algodonales';
// comp3.country = 'Spain';
// comp3.athleteId = '2';
// fakeCompetitions.push(comp3);

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

  getAllCompetitions: () => {
    return Competition.find({});
  },

  // getAthleteCompetitions: ( athleteId )=> {
  //   console.log('----getAthleteCompetitions('+athleteId+')------');
  //   if (athleteId===null || athleteId==='all' || athleteId===undefined) {
  //     console.log('Returning all competitions.');
  //     return Competition.find({});
  //   }
  //
  //   var comps=[];
  //   Athletecomp.find({ athleteId: athleteId},function(err,athleteComps){
  //
  //     athleteComps.forEach(function(athleteComp){
  //       comps.push(athleteComp.compId);
  //     });
  //
  //     console.log('Competitions for athlete('+ athleteId + '): [' + comps + ']');
  //     console.log('-------------------------------------------');
  //     Competition.find({id:{ $in: comps }},function(err,result){
  //       if (err) return handleError(err);
  //       console.log(result);
  //       return result;
  //     });
  //
  //   });
  // },

  getAthleteCompetitions: ( athleteId )=> {
    console.log('----getAthleteCompetitions('+athleteId+')------');
    if (athleteId===null || athleteId==='all' || athleteId===undefined) {
      console.log('Returning all competitions.');
      var compsPromise = Competition.find({}).exec();
      //var results = compsPromise.then(function (result) {
      return compsPromise.then(function (result) {
        console.log(result);
        return result;
      });
      //return results;
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
