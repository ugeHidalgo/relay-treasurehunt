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
  getAthleteById,
  getAthletes
} from './api';

let Schema = (db) => {

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Athlete') {
      return getAthleteById(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Athlete) {
      return athleteType;
    } else {
      return null;
    }
  }
);

let store = {};

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
			sex: {type: GraphQLString}
		}),
    interfaces: [nodeInterface]
	});


var storeType = new GraphQLObjectType({
  		name: 'Store',
  		fields: ()=>({
        athlete: {
				      type: new GraphQLList(athleteType),
				          args: {
					               id: globalIdField('Athlete')
				                },
				          resolve : (root, {id} ) => getAthleteById(id)
			  },

  			athletes: {
  				type: new GraphQLList(athleteType),
  				resolve: () => {
            return getAthletes(db);
          }
  			}
  		})
  	});

var RootQuery = new GraphQLObjectType ({
      name: 'RootQ',
      fields: () => ({
        node: nodeField,
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    });

  var schema = new GraphQLSchema({
  query: RootQuery
});

  return schema;
};

export default Schema;
