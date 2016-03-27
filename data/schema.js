import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Athlete,
  Competition,
  getStore,
  getAthletes,
  getCompetition,
  getAllCompetitions,
  getCompetitions,
} from './api';


var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Athlete') {
      return getAthlete(id);
    } else if (type === 'Competition') {
      return getCompetition(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Athlete) {
      return athleteType;
    } if (obj instanceof Competition) {
      return competitionType;
    } else {
      return null;
    }
  }
);

var store = {};

var athleteType = new GraphQLObjectType({
		name : 'Athlete',
		fields: ()=> ({
			id: globalIdField('Athlete'),
			dni: {type: GraphQLString},
			firstName: {type: GraphQLString},
			lastName: {type: GraphQLString},
			address: {type: GraphQLString},
			city: {type: GraphQLString},
			country : {type: GraphQLString},
			tlf: {type: GraphQLString},
			sex: {type: GraphQLString},
      // competitions: {
      //   type: competitionsConnection.connectionType,
      //   args: connectionArgs,
      //   resolve: (_,args) => {
      //        return connectionFromPromisedArray(
      //             getCompetitions(),args
      //        );
      //   }
      // }
      competitions: {
        type:  competitionConnection,
        args: connectionArgs,
        resolve: (_,args) => {
          return connectionFromPromisedArray(getAllCompetitions(),args);
        },
      },
		}),
    interfaces: [nodeInterface]
	});

var competitionType = new GraphQLObjectType({
  		name : 'Competition',
  		fields: ()=> ({
  			id: globalIdField('Competition'),
  			name: {type: GraphQLString},
  			type: {type: GraphQLString},
  			date: {type: GraphQLString},
  			city: {type: GraphQLString},
  			country : {type: GraphQLString},
  		}),
      interfaces: [nodeInterface]
});

var {connectionType: competitionConnection} =
    connectionDefinitions({name: 'Competition', nodeType: competitionType});

// var storeType = new GraphQLObjectType({
//   		name: 'Store',
//   		fields: {
//         id: globalIdField("Store"),
//   			athlete: {
//   				type: athleteType,
//           args: {
//             ...connectionArgs,
//             athleteId : { type: GraphQLString }
//           },
//   				resolve: (_,args) => {
//             return connectionFromPromisedArray(getAthlete(args.athleteId),args);
//           }
//   			},
//
//         athletes: {
//           type: new GraphQLList(athleteType),
//           resolve: () => {
//             return getAthletes();
//           }
//         },
//
//         competitions: {
//           type: new GraphQLList(competitionType),
//           args: {
//             athleteId : {
//               type: GraphQLString,
//               defaltValue: 'all'
//             },
//           },
//           resolve: (_,args) => {
//               return getAthleteCompetitions(args.athleteId);
//           }
//         },
//   		}
// });

let athleteConnection = connectionDefinitions({
  name: 'Athlete',
  nodeType: athleteType
});

// let competitionConnection = connectionDefinitions({
//   name: 'Competition',
//   nodeType: competitionType
// });

var storeType = new GraphQLObjectType({
  		name: 'Store',
  		fields: {
        id: globalIdField("Store"),
  			athleteConnection: {
  				type: athleteConnection.connectionType,
          args: {
            ...connectionArgs,
            firstName : { type: GraphQLString }
          },
  				resolve: (_,args) => {
            return connectionFromPromisedArray(getAthletes(args.firstName),args);
          }
  			},

        competitions: {
          type: new GraphQLList(competitionType),
          args: {
            athleteId : {
              type: GraphQLString,
              defaltValue: 'all'
            },
          },
          resolve: (_,args) => {
              return connectionFromPromisedArray(getAthleteCompetitions(args.athleteId),args);
          }
        },
  		}
});

var queryType = new GraphQLObjectType ({
      name: 'RootQuery',
      fields: () => ({
        store: {
          type: storeType,
          resolve: () => store
        }
      })
});

var mutationType = new GraphQLObjectType ({
  name: 'Mutation',
  fields: () => ({
    //Define mutations here.
  })
});

export var Schema = new GraphQLSchema({
  query: queryType,
  //mutation: mutationType
});
