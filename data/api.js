// Model types
export class Athlete {}


export function getAthleteById(db) {

  return db.collection('athletes').find(athlete => athlete.id === "QXRobGV0ZTo0");
}

export function getAthletes(db) {

  return db.collection('athletes').find({}).toArray();
}
