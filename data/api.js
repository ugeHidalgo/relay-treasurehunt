// Model types
export class Athlete {}

//Mock data

// let athletes = [];
//
// let athlete1 = new Athlete();
// athlete1.id = 1;
// athlete1.firstName = "Pepe";
// athlete1.lastName = "López";
// athletes.push(athlete1);
//
// let athlete2 = new Athlete();
// athlete2.id = 2;
// athlete2.firstName = "Juán";
// athlete2.lastName = "Sánchez";
// athletes.push(athlete2);
//
// let athlete3 = new Athlete();
// athlete3.id = 3;
// athlete3.firstName = "María";
// athlete3.lastName = "Jiménez";
// athletes.push(athlete3);
//
// let athlete4 = new Athlete();
// athlete4.id = 4;
// athlete4.firstName = "Ronald";
// athlete4.lastName = "Jeremy";
// athletes.push(athlete4);
//
// let athlete5 = new Athlete();
// athlete5.id = 5;
// athlete5.firstName = "Maleny";
// athlete5.lastName = "García";
// athletes.push(athlete5);


export function getAthleteById(id) {
  return db.collection('athletes').find(athlete => athlete.id === id)
}

export function getAthletes(db) {

  return db.collection('athletes').find({}).toArray();
}
