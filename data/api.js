// Model types
class Athlete {}
class Competition {}

let athlete = new Athlete();
athlete.id = '1';
athlete.lastName = 'Jordan';
athlete.firstName = 'Michael';


let competitions = [];
let comp1 = new Competition();
comp1.id = '1';
comp1.name = 'Triatlón Pikaeras Almuñecar';
comp1.type = 'Triatlón Sprint';
comp1.city = 'Almuñecar';
comp1.country = 'Spain';
comp1.athleteId = '1';
//competitions.push(comp1);

let comp2 = new Competition();
comp2.id = '2';
comp2.name = 'Ironman Nice';
comp2.type = 'Triatlón Ironman';
comp2.city = 'Nice';
comp2.country = 'France';
comp2.athleteId = '1';
//competitions.push(comp2);


module.exports = {

  getViewer: () => {
    return athlete;
  },

  getAthlete: (id) => {
    return athlete;
  },

  getCompetition: (db,id) => {
    //return db.collection('athletes').find(athlete => athlete.id === "QXRobGV0ZTo0");
    return db.collection('competitions')[0];
  },

  getCompetitions: (db)=> {
    //return db.collection('competitions').find({}).toArray();
    var count = db.collection('competitions').count();


    console.log ('getCompetitions: Count = '+count );

    debugger;

    //competitions = db.collection('competitions').find({}).toArray();
    return competitions;
  },

  Athlete,

  Competition,
}
