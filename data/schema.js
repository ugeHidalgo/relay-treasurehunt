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
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Athlete,
  Competition,
  getViewer,
  getAthlete,
  getCompetition,
  getCompetitions,
} from './api';

let Schema = (db) => {

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Athlete') {
      return getAthlete(id);
    } else if (type === 'Competition') {
      return getCompetition(db,id);
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
      competitions: {
        type:  competitionConnection,
        args: connectionArgs,
        resolve: (_,args) => connectionFromArray(getCompetitions(db),args),
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
//   			athletes: {
//   				type: new GraphQLList(athleteType),
//   				resolve: () => {
//             return getAthletes(db);
//           }
//   			}
//   		}
//   	});

var queryType = new GraphQLObjectType ({
      name: 'RootQuery',
      fields: () => ({
        node: nodeField,
        viewer: {
          type: athleteType,
          resolve: () => getViewer(),
        },
      })
    });

var mutationType = new GraphQLObjectType ({
  name: 'Mutation',
  fields: () => ({
    //Define mutations here.
  })
});

  var schema = new GraphQLSchema({
  query: queryType,
  //mutation: mutationType
});

  return schema;
};

export default Schema;
